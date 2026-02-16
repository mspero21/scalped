'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Save, Loader2, LogOut, Trash2, AlertTriangle, Camera, User, Heart, Search } from 'lucide-react';
import { PageContainer } from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { useFavoriteTeam } from '@/hooks/use-favorite-team';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteAccount } from '@/app/actions/delete-account';

interface TeamOption {
  name: string;
  sport: string;
}

export default function SettingsPage() {
  const { user, profile, loading: authLoading, refreshProfile, signOut } = useAuth();
  const { teamName: savedTeamName, setFavoriteTeam } = useFavoriteTeam();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [selectedTeamName, setSelectedTeamName] = useState<string | null>(null);
  const [teams, setTeams] = useState<TeamOption[]>([]);
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [showTeamPicker, setShowTeamPicker] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Load saved team name
  useEffect(() => {
    setSelectedTeamName(savedTeamName);
  }, [savedTeamName]);

  // Fetch distinct team names from stadiums
  useEffect(() => {
    async function fetchTeams() {
      const supabase = createClient();
      const { data } = await supabase
        .from('stadiums')
        .select('team_name, sport')
        .order('team_name');

      if (data) {
        // Deduplicate by team_name
        const seen = new Set<string>();
        const teamList: TeamOption[] = [];
        for (const row of data as unknown as { team_name: string; sport: string }[]) {
          if (!seen.has(row.team_name)) {
            seen.add(row.team_name);
            teamList.push({ name: row.team_name, sport: row.sport });
          }
        }
        setTeams(teamList);
      }
    }
    fetchTeams();
  }, []);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setDisplayName(profile.display_name || '');
      setBio(profile.bio || '');
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  const selectedTeam = teams.find(t => t.name === selectedTeamName);
  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(teamSearchQuery.toLowerCase())
  );

  if (authLoading || !user) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      </PageContainer>
    );
  }

  async function handleAvatarUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be less than 2MB');
      return;
    }

    setUploadingAvatar(true);
    setError(null);

    try {
      const supabase = createClient();

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        // If bucket doesn't exist, we'll just skip avatar upload
        console.error('Upload error:', uploadError);
        setError('Avatar upload not available. Please save other changes.');
        setUploadingAvatar(false);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
    } catch (err) {
      console.error('Avatar upload error:', err);
      setError('Failed to upload avatar');
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleSave() {
    if (!user) {
      setError('You must be logged in');
      return;
    }

    setError(null);
    setSuccess(false);
    setSaving(true);

    try {
      const supabase = createClient();

      // Use upsert to create profile if it doesn't exist
      // Save favorite team to localStorage
      setFavoriteTeam(selectedTeamName);

      const { error: upsertError, data } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          username: username.trim() || user.email?.split('@')[0] || 'user',
          display_name: displayName.trim() || null,
          bio: bio.trim() || null,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        } as never, {
          onConflict: 'user_id'
        })
        .select();

      if (upsertError) {
        console.error('Upsert error:', upsertError);
        if (upsertError.code === '23505') {
          throw new Error('Username is already taken');
        }
        throw upsertError;
      }

      console.log('Profile saved:', data);

      // Refresh the profile in auth context
      await refreshProfile();

      // Redirect to profile page
      router.push('/profile');
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save');
      setSaving(false);
    }
  }

  return (
    <PageContainer>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/profile">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Settings
        </h1>
      </div>

      {/* Avatar Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Photo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar
                src={avatarUrl}
                name={displayName || username || 'User'}
                size="xl"
                className="h-20 w-20"
              />
              {uploadingAvatar && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="mb-2"
              >
                <Camera className="h-4 w-4 mr-2" />
                {avatarUrl ? 'Change Photo' : 'Upload Photo'}
              </Button>
              <p className="text-xs text-[var(--foreground-muted)]">
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--input-placeholder)]">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                className="w-full pl-8 pr-3 py-2 border border-[var(--input-border)] rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-transparent"
                placeholder="username"
              />
            </div>
            <p className="text-xs text-[var(--foreground-muted)] mt-1">
              Lowercase letters, numbers, and underscores only
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--input-border)] rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-transparent"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--foreground-muted)] mb-1">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={160}
              className="w-full px-3 py-2 border border-[var(--input-border)] rounded-lg bg-[var(--input-bg)] text-[var(--input-text)] focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-transparent resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-[var(--foreground-muted)] mt-1 text-right">
              {bio.length}/160
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm text-emerald-600">Profile saved!</p>
            </div>
          )}

          <Button type="button" onClick={handleSave} disabled={saving} className="w-full">
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Favorite Team */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Favorite Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showTeamPicker ? (
            <button
              onClick={() => setShowTeamPicker(true)}
              className="w-full text-left p-4 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl hover:bg-[var(--card-hover)] transition-colors"
            >
              {selectedTeam ? (
                <div>
                  <p className="font-medium text-[var(--foreground)]">{selectedTeam.name}</p>
                  <p className="text-sm text-[var(--foreground-muted)]">{selectedTeam.sport}</p>
                </div>
              ) : (
                <p className="text-[var(--foreground-muted)]">Tap to select your favorite team</p>
              )}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--input-placeholder)]" />
                <input
                  type="text"
                  value={teamSearchQuery}
                  onChange={(e) => setTeamSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-lg text-[var(--input-text)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)]"
                  placeholder="Search teams..."
                  autoFocus
                />
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {filteredTeams.slice(0, 30).map((team) => (
                  <button
                    key={team.name}
                    onClick={() => {
                      setSelectedTeamName(team.name);
                      setFavoriteTeam(team.name);
                      setShowTeamPicker(false);
                      setTeamSearchQuery('');
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedTeamName === team.name
                        ? 'bg-emerald-100 border border-emerald-500'
                        : 'bg-[var(--input-bg)] hover:bg-[var(--card-hover)]'
                    }`}
                  >
                    <p className="font-medium text-[var(--foreground)] text-sm">{team.name}</p>
                    <p className="text-xs text-[var(--foreground-muted)]">{team.sport}</p>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowTeamPicker(false);
                    setTeamSearchQuery('');
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                {selectedTeamName && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTeamName(null);
                      setFavoriteTeam(null);
                      setShowTeamPicker(false);
                    }}
                    className="flex-1 text-red-600"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={() => signOut()}
            className="w-full justify-start"
          >
            <LogOut className="h-4 w-4 mr-2 text-[var(--foreground-muted)]" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showDeleteConfirm ? (
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-[var(--foreground-muted)]">
                This will permanently delete your account and all your data including rankings, visits, and bucket list.
                This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      const result = await deleteAccount();
                      if (result.error) {
                        setError(result.error);
                        setShowDeleteConfirm(false);
                        return;
                      }
                      // Sign out and redirect
                      await signOut();
                      router.push('/');
                    } catch (err) {
                      console.error('Error deleting account:', err);
                      setError('Failed to delete account');
                      setShowDeleteConfirm(false);
                    }
                  }}
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}


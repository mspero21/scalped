'use client';

import { useState, useEffect } from 'react';
import { Search, X, Loader2, Users as UsersIcon } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { FollowButton } from '@/components/profile/follow-button';
import { useUserSearch } from '@/hooks/use-user-search';
import { cn } from '@/lib/utils';

interface UserSearchProps {
  currentUserId?: string;
}

export function UserSearch({ currentUserId }: UserSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { results, loading, searchUsers, clearResults } = useUserSearch();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.trim()) {
        searchUsers(query);
      } else {
        clearResults();
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, searchUsers, clearResults]);

  const handleClear = () => {
    setQuery('');
    clearResults();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground-muted)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search users..."
          className={cn(
            'w-full pl-10 pr-10 py-2 rounded-lg border',
            'bg-[var(--card-bg)]',
            'border-[var(--card-border)]',
            'text-[var(--foreground)]',
            'placeholder-[var(--foreground-muted)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--accent-ring)] focus:border-transparent',
            'transition-all'
          )}
        />
        {(query || loading) && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Results */}
          <div className="absolute top-full left-0 right-0 mt-2 z-20 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-[var(--foreground-muted)]" />
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--card-hover)] transition-colors"
                  >
                    <Avatar
                      src={user.avatar_url}
                      name={user.display_name || user.username || 'User'}
                      size="md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[var(--foreground)] truncate">
                        {user.display_name || user.username || 'Anonymous'}
                      </p>
                      <p className="text-sm text-[var(--foreground-muted)] truncate">
                        @{user.username || 'unknown'}
                      </p>
                      {user.bio && (
                        <p className="text-xs text-[var(--foreground-muted)] truncate mt-0.5">
                          {user.bio}
                        </p>
                      )}
                    </div>
                    {currentUserId && currentUserId !== user.user_id && (
                      <FollowButton
                        targetUserId={user.user_id}
                        currentUserId={currentUserId}
                        size="sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <UsersIcon className="h-8 w-8 text-[var(--foreground-muted)] mx-auto mb-2" />
                <p className="text-sm text-[var(--foreground-muted)]">
                  No users found
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

create table if not exists record (
    created_at integer not null default (unixepoch()),
    language text not null,
    mode integer not null,
    name text not null,
    score integer not null,
    time integer not null
) strict;

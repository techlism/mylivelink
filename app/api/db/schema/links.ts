export enum LinkType {
    Existing = 'existing',
    New = 'new'
}

export enum LinkCategory {
    Normal = 'normal',
    Social = 'social'
}

export interface LinkSchema {
    title: string;
    url: string;
    thumbnailUrl: string;
    type: LinkType;
    faviconURL: string;
    category: LinkCategory;
    username: string;
}

/*
Links (
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    thumbnailUrl TEXT,
    type TEXT NOT NULL CHECK(type IN ('existing', 'new')),
    faviconURL TEXT,
    category TEXT NOT NULL CHECK(category IN ('normal', 'social')),
    username TEXT,
    FOREIGN KEY(username) REFERENCES Users(username),
    PRIMARY KEY(url, username)
);
*/
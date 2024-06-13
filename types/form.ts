export enum ARC53FormProgress {
    token = 'token',
    associate = 'associate',
    collection = 'collection',
    faq = 'faq',
    extras = 'extras'
}

export const ARC53FormProgressOrder = [
    ARC53FormProgress.token,
    ARC53FormProgress.associate,
    ARC53FormProgress.collection,
    ARC53FormProgress.faq,
    ARC53FormProgress.extras
] as const;


export enum FormInputID {
    TokenAssetID = 'token-asset-id',
    TokenImage = 'token-image',
    TokenImageIntegrity = 'token-image-integrity',
    TokenImageMimeType = 'token-image-mime',

    TeamMemberAddress = 'team-member-address',
    TeamMemberRole = 'team-member-role',

    CollectionName = 'collection-name',
    CollectionDescription = 'collection-description',
    CollectionBanner = 'collection-banner',
    CollectionAvatar = 'collection-avatar',
    CollectionExplicit = 'collection-explicit',
    CollectionPrefixes = 'collection-prefixes',
    CollectionAddresses = 'collection-addresses',
    CollectionAssets = 'collection-assets',
    CollectionExcludedAssets = 'collection-excluded-assets',
    CollectionArtists = 'collection-artists',

    CollectionTraitName = 'collection-trait-name',
    CollectionTraitValue = 'collection-trait-value',
    CollectionTraitValueImage = 'collection-trait-value-image',
    CollectionTraitValueImageIntegrity = 'collection-trait-value-image-integrity',
    CollectionTraitValueImageMimeType = 'collection-trait-value-image-mime',

    FAQQuestion = 'faq-question',
    FAQAnswer = 'faq-answer',

    ExtraKey = 'extra-key',
    ExtraValue = 'extra-value',

    // SPECIAL: just for getting trait value lists, not an input we use otherwise
    CollectionTraitValueList = 'collection-trait-value-list',
}

export function getInputID(id: FormInputID, key: string) {
    return `${id}-${key}`;
}
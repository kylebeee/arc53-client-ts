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
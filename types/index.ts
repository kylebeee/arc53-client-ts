export interface Arc53 {
    version:     string;
    tokens:      Token[];
    associates:  Associate[];
    collections: Collection[];
    faq:         FAQ[];
}

export interface Token {
    asset_id:        number;
    image?:           string;
    image_integrity?: string;
    image_mimetype?:  string;
}

export interface Associate {
    address: string;
    role:    string;
}

export interface Collection {
    name:            string;
    prefixes:        string[];
    addresses:       string[];
    assets:          any[];
    excluded_assets: any[];
    description:     string;
    banner?:         number;
    avatar:          number;
    network?:        string;
    artists:         string[];
    explicit:        boolean;
    properties:      Property[];
}

export interface Property {
    name:   string;
    values: PropertyValue[];
}

export interface PropertyValue {
    name:            string;
    image?:           string;
    image_integrity?: string;
    image_mimetype?:  string;
}

export interface FAQ {
    q: string;
    a: string;
}

import { Associate, Collection, FAQ, Property, PropertyValue, Token } from "@/types";
import { FormInputID, getInputID } from "@/types/form";

const getValueByID = (id: FormInputID, key: string) => (document.getElementById(getInputID(id, key)) as HTMLInputElement)?.value;
const getCheckedByID = (id: FormInputID, key: string) => (document.getElementById(getInputID(id, key)) as HTMLInputElement)?.checked;

export function getFormTokenData(key: string): Token | null {
    const asset_id = getValueByID(FormInputID.TokenAssetID, key);
    const image = getValueByID(FormInputID.TokenImage, key);
    const image_integrity = getValueByID(FormInputID.TokenImageIntegrity, key);
    const image_mimetype = getValueByID(FormInputID.TokenImageMimeType, key);

    if (!asset_id) return null;

    const payload: Token = { asset_id: parseInt(asset_id) };

    if (image) payload.image = image;
    if (image_integrity) payload.image_integrity = image_integrity;
    if (image_mimetype) payload.image_mimetype = image_mimetype;

    return payload;
}

export function getFormTeamMemberData(key: string): Associate | null {
    const address = getValueByID(FormInputID.TeamMemberAddress, key);
    const role = getValueByID(FormInputID.TeamMemberRole, key);

    if (!address) return null;
    if (!role) return null;

    return {
        address,
        role
    };
}

export function getFormCollectionData(key: string, traitsMap: {[key: string]: string[]}): Collection | null {
    const name = getValueByID(FormInputID.CollectionName, key);
    const description = getValueByID(FormInputID.CollectionDescription, key);
    const banner = getValueByID(FormInputID.CollectionBanner, key);
    const avatar = getValueByID(FormInputID.CollectionAvatar, key);
    const network = 'algorand';
    const explicit = getCheckedByID(FormInputID.CollectionExplicit, key);
    const prefixes = getValueByID(FormInputID.CollectionPrefixes, key);
    const addresses = getValueByID(FormInputID.CollectionAddresses, key);
    const artists = getValueByID(FormInputID.CollectionArtists, key);
    const excluded_assets = getValueByID(FormInputID.CollectionExcludedAssets, key);
    const assets = getValueByID(FormInputID.CollectionAssets, key);

    if (!name) return null;

    let propertyList: Property[] = [];

    if (traitsMap.hasOwnProperty(key)) {
        const traitList = traitsMap[key];

        for (const traitKey of traitList) {

            const name = getValueByID(FormInputID.CollectionTraitName, `${traitKey}-${key}`);

            if (!name) continue;

            const traits = getValueByID(FormInputID.CollectionTraitValueList, `${traitKey}-${key}`);

            if (!traits) continue;

            let propertyValues: PropertyValue[] = [];

            for (const trait of traits.split('|||')) {

                if (!trait) continue;

                const traitValue = getValueByID(FormInputID.CollectionTraitValue, `${trait}-${traitKey}-${key}`);

                if (!traitValue) continue;

                const propertyValue: PropertyValue = { name: traitValue };

                const traitImage = getValueByID(FormInputID.CollectionTraitValueImage, `${traitValue}-${traitKey}-${key}`);
                const traitImageIntegrity = getValueByID(FormInputID.CollectionTraitValueImageIntegrity, `${traitValue}-${traitKey}-${key}`);
                const traitImageMimeType = getValueByID(FormInputID.CollectionTraitValueImageMimeType, `${traitValue}-${traitKey}-${key}`);

                if (!!traitImage) {
                    propertyValue.image = traitImage;
                }

                if (!!traitImageIntegrity) {
                    propertyValue.image_integrity = traitImageIntegrity;
                }

                if (!!traitImageMimeType) {
                    propertyValue.image_mimetype = traitImageMimeType;
                }

                propertyValues = [
                    ...propertyValues,
                    propertyValue,
                ]
            }

            propertyList = [
                ...propertyList,
                {
                    name,
                    values: propertyValues
                }
            ]
        }
    }

    const payload: Collection = { name, network, explicit };

    if (!!description) {
        payload.description = description;
    }
    if (!!banner) {
        payload.banner = !!banner ? parseInt(banner) : undefined;
    }
    if (!!avatar) {
        payload.avatar = !!avatar ? parseInt(avatar) : undefined;
    }
    if (!!network) {
        payload.network = network;
    }
    if (!!explicit) {
        payload.explicit = explicit;
    }
    if (!!prefixes) {
        console.log('prefixes', prefixes);
        payload.prefixes = prefixes.split('|||');
    }
    if (!!addresses) {
        payload.addresses = addresses.split('|||');
    }
    if (!!artists) {
        payload.artists = artists.split('|||');
    }
    if (!!excluded_assets) {
        payload.excluded_assets = excluded_assets.split('|||');
    }
    if (!!assets) {
        payload.assets = assets.split('|||');
    }

    if (propertyList.length > 0) {
        payload.properties = propertyList;
    }

    return payload;
}

export function getFormFAQData(key: string): FAQ | null {
    const q = getValueByID(FormInputID.FAQQuestion, key);
    const a = getValueByID(FormInputID.FAQAnswer, key);

    if (!q) return null;
    if (!a) return null;

    return { q, a };
}

export function getFormExtraData(key: string): { key: string, value: string } | null {
    const k = getValueByID(FormInputID.ExtraKey, key);
    const v = getValueByID(FormInputID.ExtraValue, key);

    if (!k) return null;
    if (!v) return null;

    return { key: k, value: v };
}
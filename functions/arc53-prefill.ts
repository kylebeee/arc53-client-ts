import { Arc53 } from '@/types'
import { FormInputID } from '@/types/form'
import uuid from '@/functions/random'

export interface FormInitialState {
  tokensList: string[]
  teamMembersList: string[]
  collectionsList: string[]
  traitsMap: { [key: string]: string[] }
  faqList: string[]
  extrasList: string[]
  // Maps UUID key -> { FormInputID -> value }
  defaultValues: Record<string, Record<string, string>>
  // Maps UUID key -> initial list items for sub-components
  initialLists: Record<string, {
    prefixes?: string[]
    addresses?: string[]
    assets?: string[]
    excludedAssets?: string[]
    artists?: string[]
    traitValues?: Record<string, string[]> // traitKey -> values
  }>
}

export function buildFormStateFromArc53(data: Arc53): FormInitialState {
  const defaultValues: Record<string, Record<string, string>> = {}
  const initialLists: FormInitialState['initialLists'] = {}

  // Tokens
  const tokensList = (data.tokens ?? []).map(token => {
    const key = uuid(8)
    defaultValues[key] = {
      [FormInputID.TokenAssetID]: String(token.asset_id),
      [FormInputID.TokenImage]: token.image ?? '',
      [FormInputID.TokenImageIntegrity]: token.image_integrity ?? '',
      [FormInputID.TokenImageMimeType]: token.image_mimetype ?? '',
    }
    return key
  })

  // Associates
  const teamMembersList = (data.associates ?? []).map(assoc => {
    const key = uuid(8)
    defaultValues[key] = {
      [FormInputID.TeamMemberAddress]: assoc.address,
      [FormInputID.TeamMemberRole]: assoc.role,
    }
    return key
  })

  // Collections
  const traitsMap: { [key: string]: string[] } = {}

  const collectionsList = (data.collections ?? []).map(col => {
    const key = uuid(8)
    defaultValues[key] = {
      [FormInputID.CollectionName]: col.name,
      [FormInputID.CollectionDescription]: col.description ?? '',
      [FormInputID.CollectionBanner]: col.banner ? String(col.banner) : '',
      [FormInputID.CollectionAvatar]: col.avatar ? String(col.avatar) : '',
    }

    initialLists[key] = {
      prefixes: col.prefixes ?? [],
      addresses: col.addresses ?? [],
      assets: (col.assets ?? []).map(String),
      excludedAssets: (col.excluded_assets ?? []).map(String),
      artists: col.artists ?? [],
    }

    // Properties / traits
    if (col.properties && col.properties.length > 0) {
      const traitKeys: string[] = []
      const traitValuesMap: Record<string, string[]> = {}

      for (const prop of col.properties) {
        const traitKey = uuid(8)
        traitKeys.push(traitKey)

        // Store trait name as a default value using the composite key pattern
        defaultValues[`${traitKey}-${key}`] = {
          [FormInputID.CollectionTraitName]: prop.name,
        }

        // Store trait values
        const valueNames = prop.values.map(v => v.name)
        traitValuesMap[traitKey] = valueNames

        // Store image data for each trait value
        for (const val of prop.values) {
          if (val.image) {
            const compositeKey = `${val.name}-${traitKey}-${key}`
            defaultValues[compositeKey] = {
              [FormInputID.CollectionTraitValueImage]: val.image,
              [FormInputID.CollectionTraitValueImageIntegrity]: val.image_integrity ?? '',
              [FormInputID.CollectionTraitValueImageMimeType]: val.image_mimetype ?? '',
            }
          }
        }
      }

      traitsMap[key] = traitKeys
      initialLists[key].traitValues = traitValuesMap
    }

    return key
  })

  // FAQ
  const faqList = (data.faq ?? []).map(faq => {
    const key = uuid(8)
    defaultValues[key] = {
      [FormInputID.FAQQuestion]: faq.q,
      [FormInputID.FAQAnswer]: faq.a,
    }
    return key
  })

  // Extras
  const extrasList = (data.extras ?? []).map(extra => {
    const key = uuid(8)
    defaultValues[key] = {
      [FormInputID.ExtraKey]: extra.key,
      [FormInputID.ExtraValue]: extra.value,
    }
    return key
  })

  return {
    tokensList,
    teamMembersList,
    collectionsList,
    traitsMap,
    faqList,
    extrasList,
    defaultValues,
    initialLists,
  }
}

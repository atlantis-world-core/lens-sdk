import { BigNumber } from 'ethers'
import { getLensHubContract, getMyProfileId } from 'actions'
import { Publication } from 'types'

export const getPublication = async (
    profileId: BigNumber,
    pubId: BigNumber
) => {
    const lensHub = await getLensHubContract()
    const publicationData = await lensHub.getPub(profileId, pubId)
    const publication = new Publication(
        pubId,
        profileId,
        publicationData.profileIdPointed,
        publicationData.pubIdPointed,
        publicationData.contentURI,
        publicationData.referenceModule,
        publicationData.collectModule,
        publicationData.collectNFT
    )
    return publication
}

export const getMyPublication = async (pubId: BigNumber) => {
    const myProfileId = await getMyProfileId()
    const myPublication = await getPublication(myProfileId, pubId)
    return myPublication
}

export const getLastPublication = async (profileId: BigNumber) => {
    const lensHub = await getLensHubContract()
    const pubCount = await lensHub.getPubCount(profileId)
    const lastPublication = await getPublication(profileId, pubCount)
    return lastPublication
}

export const getMyLastPublication = async () => {
    const lensHub = await getLensHubContract()
    const myProfileId = await getMyProfileId()
    const pubCount = await lensHub.getPubCount(myProfileId)
    const myLastPublication = await getMyPublication(pubCount)
    return myLastPublication
}

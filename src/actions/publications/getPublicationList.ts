import { BigNumber } from 'ethers'
import {
    getLensHubContract,
    getMyProfileId,
    getMyPublication,
    getPublication,
} from 'actions'

export const getPublicationList = async (profileId: BigNumber) => {
    const lensHub = await getLensHubContract()
    const publicationList = []
    const pubCount = (await lensHub.getPubCount(profileId)).toNumber()
    for (let pubId = 1; pubId <= pubCount; pubId++) {
        const publication = await getPublication(
            profileId,
            BigNumber.from(pubId)
        )
        publicationList.push(publication)
    }
    return publicationList
}

export const getMyPublicationList = async (profileNum?: number) => {
    const lensHub = await getLensHubContract()
    const myPublicationList = []
    const myProfileId = await getMyProfileId(profileNum)
    const pubCount = (await lensHub.getPubCount(myProfileId)).toNumber()
    for (let pubId = 1; pubId <= pubCount; pubId++) {
        const myPublication = await getMyPublication(BigNumber.from(pubId))
        myPublicationList.push(myPublication)
    }
    return myPublicationList
}

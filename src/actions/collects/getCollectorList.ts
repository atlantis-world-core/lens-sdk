import { BigNumber } from 'ethers'
import _ from 'lodash'
import { getCollectNFTContract, getProfile, getPublication } from 'actions'
import { Profile } from 'types'

export const getCollectorList = async (
    profileId: BigNumber,
    pubId: BigNumber
) => {
    const publication = await getPublication(profileId, pubId)
    let collectorList: Profile[] = []

    const publicationCollectNFT = await getCollectNFTContract(
        publication.collectNFT
    )
    const totalCollects = (await publicationCollectNFT.totalSupply()).toNumber()

    for (let collectId = 1; collectId <= totalCollects; collectId++) {
        const collectorAddress = await publicationCollectNFT.ownerOf(collectId)
        const collector = await getProfile(collectorAddress)
        if (!!collector) collectorList.push(collector)
    }

    collectorList = _.uniqBy(collectorList, 'handle')
    return collectorList
}

import { BigNumber, BytesLike } from 'ethers'
import { DataTypes as LensDataTypes } from 'types/contracts/LensHub'
import {
    collect,
    comment,
    follow,
    getCollectorList,
    getFollowerList,
    setProfileImageURI,
} from 'actions'
import { BaseProvider } from '@ethersproject/providers'
import { Signer } from 'ethers'

export type SignerOrProvider = Signer | BaseProvider

export class Profile implements LensDataTypes.ProfileStructStruct {
    id: BigNumber
    address: string
    pubCount: BigNumber
    followModule: string
    followNFT: string
    handle: string
    imageURI: string
    followNFTURI: string
    isExist: boolean

    constructor(
        id: BigNumber,
        address: string,
        pubCount: BigNumber,
        followModule: string,
        followNFT: string,
        handle: string,
        imageURI: string,
        followNFTURI: string
    ) {
        this.id = id
        this.address = address
        this.pubCount = pubCount
        this.followModule = followModule
        this.followNFT = followNFT
        this.handle = handle
        this.imageURI = imageURI
        this.followNFTURI = followNFTURI
        this.isExist = this.id.toNumber() !== 0 && handle !== ''
    }

    setImageURI = async (imageURI: string) =>
        await setProfileImageURI(this.id, imageURI)

    follow = async () => await follow(this.id)
    followers = async () => await getFollowerList(this.id)
}

export enum PublicationType {
    Post,
    Comment,
}
export class Publication implements LensDataTypes.PublicationStructStruct {
    id: BigNumber
    authorProfileId: BigNumber
    profileIdPointed: BigNumber
    pubIdPointed: BigNumber
    contentURI: string
    referenceModule: string
    collectModule: string
    collectNFT: string
    type: PublicationType

    constructor(
        id: BigNumber,
        authorProfileId: BigNumber,
        profileIdPointed: BigNumber,
        pubIdPointed: BigNumber,
        contentURI: string,
        referenceModule: string,
        collectModule: string,
        collectNFT: string
    ) {
        this.id = id
        this.authorProfileId = authorProfileId
        this.profileIdPointed = profileIdPointed
        this.pubIdPointed = pubIdPointed
        this.contentURI = contentURI
        this.referenceModule = referenceModule
        this.collectModule = collectModule
        this.collectNFT = collectNFT
        this.type =
            pubIdPointed.toNumber() === 0
                ? PublicationType.Post
                : PublicationType.Comment
    }

    comment = async (
        contentURI?: string | undefined,
        profileId?: BigNumber | undefined
    ) =>
        await comment({
            authorProfileId: this.authorProfileId,
            pubId: this.id,
            profileId,
            contentURI,
        })

    collect = async (collectModuleData?: BytesLike | undefined) =>
        await collect({
            profileId: this.authorProfileId,
            pubId: this.id,
            collectModuleData,
        })
    collectors = async () =>
        await getCollectorList(this.authorProfileId, this.id)
}

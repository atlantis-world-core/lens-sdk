import { useState } from 'react'
import {
    Avatar,
    Button,
    Flex,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
} from '@chakra-ui/react'
import {
    useCollect,
    useCollectorList,
    useComment,
    useCreateProfile,
    useFollow,
    useFollowerList,
    usePost,
    useProfile,
    usePublicationList,
} from 'hooks'
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi'
import { SUPPORTED_CHAIN_IDS } from '../../constants'
import { PublicationType } from 'types'
import { BigNumber } from 'ethers'

export const LensPlayground = () => {
    const [profileIdOrHandleOrAddress, setProfileIdOrHandleOrAddress] =
        useState<string>('')

    /**
     * CHAIN
     */
    const {
        connect,
        connectors,
        isLoading: isLoadingConnectWallet,
    } = useConnect()
    const { isConnected } = useAccount()
    const { chain: activeChain } = useNetwork()
    const { switchNetwork } = useSwitchNetwork()
    const switchNetworkIfNeeded = () => {
        if (activeChain?.unsupported) {
            switchNetwork?.(SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI)
            return true
        }
    }
    /**
     * CHAIN END
     */

    /**
     * PROFILES
     */
    const { mutateAsync: createProfile, isLoading: isLoadingCreateProfile } =
        useCreateProfile()

    const {
        data: myProfile,
        isLoading: isLoadingMyProfile,
        refetch: refetchMyProfile,
    } = useProfile()

    const { data: userProfile } = useProfile(profileIdOrHandleOrAddress)
    /**
     * PROFILES END
     */

    /**
     * FOLLOWS
     */
    const { mutateAsync: follow, isLoading: isFollowing } = useFollow(
        profileIdOrHandleOrAddress
    )
    const {
        data: followerList,
        isLoading: isLoadingFollowerList,
        refetch: refetchFollowerList,
    } = useFollowerList(profileIdOrHandleOrAddress)
    /**
     * FOLLOWS END
     */

    /**
     * PUBLICATIONS
     */
    const { mutateAsync: post, isLoading: isPosting } = usePost()
    const { mutateAsync: comment, isLoading: isCommenting } = useComment()
    const { mutateAsync: collect, isLoading: isCollecting } = useCollect()
    const { data: publicationList } = usePublicationList(
        profileIdOrHandleOrAddress
    )
    const { data: collectorList } = useCollectorList(
        publicationList?.at(0)?.id || BigNumber.from(0),
        publicationList?.at(0)?.authorProfileId
    )
    /**
     * PUBLICATIONS END
     */

    /**
     * UI
     */
    const renderInput = () => (
        <Input
            value={profileIdOrHandleOrAddress}
            onChange={(el) => setProfileIdOrHandleOrAddress(el.target.value)}
        />
    )

    /**
     * BUTTONS
     */
    const renderConnectWalletButton = () => (
        <Button
            className="text__cyborg-sister"
            colorScheme="whatsapp"
            fontSize="2xl"
            variant="outline"
            onClick={() => {
                connect({ connector: connectors[0] })
            }}
            isLoading={isLoadingConnectWallet}
            loadingText="Connecting..."
        >
            Connect Wallet
        </Button>
    )

    const renderCreateLensProfileButton = () => (
        <Button
            className="text__cyborg-sister"
            colorScheme="whatsapp"
            fontSize="2xl"
            variant="outline"
            onClick={() => {
                switchNetworkIfNeeded()
                createProfile({
                    handle: profileIdOrHandleOrAddress,
                })
            }}
            isLoading={isLoadingCreateProfile}
            loadingText="Creating..."
        >
            Create Profile 🌿
        </Button>
    )

    const renderRefetchProfileInfoButton = () => (
        <Button
            className="text__cyborg-sister"
            colorScheme="whatsapp"
            fontSize="2xl"
            variant="outline"
            onClick={() => {
                switchNetworkIfNeeded()
                refetchMyProfile()
            }}
            isLoading={isLoadingMyProfile}
            loadingText="Fetching..."
        >
            Get Profile Info 🌿
        </Button>
    )

    const renderFollowButton = () => (
        <Button
            className="text__cyborg-sister"
            colorScheme="whatsapp"
            fontSize="2xl"
            variant="outline"
            onClick={() => {
                switchNetworkIfNeeded()
                follow()
            }}
            isLoading={isFollowing}
            loadingText="Following..."
        >
            Follow Profile 🌿
        </Button>
    )

    const renderGetFollowersButton = () => (
        <Button
            className="text__cyborg-sister"
            colorScheme="whatsapp"
            fontSize="2xl"
            variant="outline"
            onClick={() => {
                switchNetworkIfNeeded()
                refetchFollowerList()
            }}
            isLoading={isLoadingFollowerList}
            loadingText="Fetching..."
        >
            Get Followers 🌿
        </Button>
    )

    const renderPostButton = () => (
        <Button
            className="text__cyborg-sister"
            colorScheme="whatsapp"
            fontSize="2xl"
            variant="outline"
            onClick={() => {
                switchNetworkIfNeeded()
                post({})
            }}
            isLoading={isPosting}
            loadingText="Posting..."
        >
            Post 🌿
        </Button>
    )

    const renderCommentButton = () => (
        <Button
            className="text__cyborg-sister"
            colorScheme="whatsapp"
            variant="outline"
            fontSize="2xl"
            onClick={() => {
                switchNetworkIfNeeded()
                if (!!publicationList && publicationList?.length > 0) {
                    // publicationList[0].comment()
                    comment({
                        authorProfileId: publicationList[0].authorProfileId,
                        pubId: publicationList[0].id,
                    })
                }
            }}
            isLoading={isCommenting}
            loadingText="Commenting..."
        >
            Comment 🌿
        </Button>
    )

    const renderCollectButton = () => (
        <Button
            className="text__cyborg-sister"
            colorScheme="whatsapp"
            variant="outline"
            fontSize="2xl"
            onClick={() => {
                switchNetworkIfNeeded()
                if (!!publicationList && publicationList?.length > 0)
                    // publicationList[0].collect()
                    collect({
                        profileId: publicationList[0].authorProfileId,
                        pubId: publicationList[0].id,
                    })
            }}
            isLoading={isCollecting}
            loadingText="Collecting..."
        >
            Collect 🌿
        </Button>
    )
    /**
     * BUTTONS END
     */

    /**
     * DATAVIEW
     */
    const renderMyProfileInfo = () => (
        <Stack>
            <Heading color="whatsapp.300" className="text__cyborg-sister">
                My Profile:
            </Heading>
            <HStack>
                <Avatar src={myProfile?.imageURI} w="25px" h="auto" />
                <Text>{myProfile?.handle}</Text>
            </HStack>
        </Stack>
    )

    const renderProfileInfo = () => (
        <Stack>
            <Heading color="whatsapp.300" className="text__cyborg-sister">
                Profile:
            </Heading>
            <HStack>
                <Avatar src={userProfile?.imageURI} w="25px" h="auto" />
                <Text>{userProfile?.handle}</Text>
            </HStack>
        </Stack>
    )

    const renderFollowersList = () => (
        <Stack>
            <Heading color="whatsapp.300" className="text__cyborg-sister">
                Followers:
            </Heading>
            {followerList?.map((follower) => (
                <HStack key={follower.handle}>
                    <Avatar src={follower.imageURI} w="25px" h="auto" />
                    <Text>{follower.handle}</Text>
                </HStack>
            ))}
        </Stack>
    )

    const renderPostList = () => (
        <Stack>
            <Heading color="whatsapp.300" className="text__cyborg-sister">
                Posts:
            </Heading>
            {publicationList
                ?.filter(
                    (publication) => publication.type === PublicationType.Post
                )
                .map((publication, index) => (
                    <HStack key={index}>
                        <Text>
                            <iframe src={publication.contentURI} />
                        </Text>
                    </HStack>
                ))}
        </Stack>
    )

    const renderCollectorList = () => (
        <Stack>
            <Heading color="whatsapp.300" className="text__cyborg-sister">
                Collectors:
            </Heading>
            {collectorList?.map((collector) => (
                <HStack key={collector.handle}>
                    <Avatar src={collector.imageURI} w="25px" h="auto" />
                    <Text>{collector.handle}</Text>
                </HStack>
            ))}
        </Stack>
    )

    const renderCommentList = () => (
        <Stack>
            <Heading color="whatsapp.300" className="text__cyborg-sister">
                Comments:
            </Heading>
            {publicationList
                ?.filter(
                    (publication) =>
                        publication.type === PublicationType.Comment
                )
                .map((publication, index) => (
                    <HStack key={index}>
                        <Text>
                            <iframe src={publication.contentURI} />
                        </Text>
                    </HStack>
                ))}
        </Stack>
    )
    /**
     * DATAVIEW END
     */

    return (
        <Flex
            w="full"
            maxH="90%"
            overflow="scroll"
            alignItems="center"
            justifyContent="center"
            p={10}
        >
            <Stack spacing={4}>
                {!isConnected ? (
                    renderConnectWalletButton()
                ) : (
                    <>
                        {renderInput()}
                        {renderCreateLensProfileButton()}
                        {renderRefetchProfileInfoButton()}
                        {renderFollowButton()}
                        {renderGetFollowersButton()}
                        {renderPostButton()}
                        {renderCommentButton()}
                        {renderCollectButton()}
                        {!!myProfile && renderMyProfileInfo()}
                        {!!userProfile && renderProfileInfo()}
                        {!!followerList && renderFollowersList()}
                        {!!publicationList && renderPostList()}
                        {!!collectorList && renderCollectorList()}
                        {!!publicationList && renderCommentList()}
                    </>
                )}
            </Stack>
        </Flex>
    )
}

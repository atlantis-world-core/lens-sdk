import { SUPPORTED_CHAIN_IDS } from './chains'

export type LensContract =
  | 'LensHub'
  | 'FollowNFT'
  | 'CollectNFT'
  | 'ProfileCreationProxy'
  | 'FreeCollectModule'

export const CONTRACT_ADDRESSES: Record<
  number,
  Record<LensContract, string>
> = {
  [SUPPORTED_CHAIN_IDS.POLYGON]: {
    LensHub: '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d',
    FollowNFT: '0xb0298c5540f4cfb3840c25d290be3ef3fe09fa8c',
    CollectNFT: '0xec9d9e482ce7fb715605e18add72b5a696880357',
    ProfileCreationProxy: '0x1eeC6ecCaA4625da3Fa6Cd6339DBcc2418710E8a',
    FreeCollectModule: '0x23b9467334bEb345aAa6fd1545538F3d54436e96',
  },

  [SUPPORTED_CHAIN_IDS.POLYGON_MUMBAI]: {
    LensHub: '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82',
    FollowNFT: '0x1a2bb1bc90aa5716f5eb85fd1823338bd1b6f772',
    CollectNFT: '0x9417ffd1e38ef421ccd3dc5a90fdc46047afacc4',
    ProfileCreationProxy: '0x420f0257D43145bb002E69B14FF2Eb9630Fc4736',
    FreeCollectModule: '0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c',
  },
}

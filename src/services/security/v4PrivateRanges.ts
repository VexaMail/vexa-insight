/**
 * IPv4 ranges considered private/reserved/loopback/link-local/CGNAT/metadata.
 * Each entry is [lowInclusive, highInclusive] as unsigned 32-bit integers.
 */
export const V4_PRIVATE_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x00_00_00_00, 0x00_ff_ff_ff], // 0.0.0.0/8
  [0x0a_00_00_00, 0x0a_ff_ff_ff], // 10/8
  [0x64_40_00_00, 0x64_7f_ff_ff], // 100.64/10 CGNAT
  [0x7f_00_00_00, 0x7f_ff_ff_ff], // 127/8 loopback
  [0xa9_fe_00_00, 0xa9_fe_ff_ff], // 169.254/16 link-local
  [0xac_10_00_00, 0xac_1f_ff_ff], // 172.16/12
  [0xc0_00_00_00, 0xc0_00_00_ff], // 192.0.0/24
  [0xc0_00_02_00, 0xc0_00_02_ff], // 192.0.2/24 TEST-NET-1
  [0xc0_a8_00_00, 0xc0_a8_ff_ff], // 192.168/16
  [0xc6_12_00_00, 0xc6_13_ff_ff], // 198.18/15 benchmarking
  [0xc6_33_64_00, 0xc6_33_64_ff], // 198.51.100/24 TEST-NET-2
  [0xcb_00_71_00, 0xcb_00_71_ff], // 203.0.113/24 TEST-NET-3
  [0xe0_00_00_00, 0xff_ff_ff_ff], // 224/4 multicast + 240/4 reserved + 255.255.255.255
] as const

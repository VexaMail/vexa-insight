/**
 * IPv4 ranges considered private/reserved/loopback/link-local/CGNAT/metadata.
 * Each entry is [lowInclusive, highInclusive] as unsigned 32-bit integers.
 */
export const V4_PRIVATE_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x00_00_00_00, 0x00_FF_FF_FF], // 0.0.0.0/8
  [0x0A_00_00_00, 0x0A_FF_FF_FF], // 10/8
  [0x64_40_00_00, 0x64_7F_FF_FF], // 100.64/10 CGNAT
  [0x7F_00_00_00, 0x7F_FF_FF_FF], // 127/8 loopback
  [0xA9_FE_00_00, 0xA9_FE_FF_FF], // 169.254/16 link-local
  [0xAC_10_00_00, 0xAC_1F_FF_FF], // 172.16/12
  [0xC0_00_00_00, 0xC0_00_00_FF], // 192.0.0/24
  [0xC0_00_02_00, 0xC0_00_02_FF], // 192.0.2/24 TEST-NET-1
  [0xC0_A8_00_00, 0xC0_A8_FF_FF], // 192.168/16
  [0xC6_12_00_00, 0xC6_13_FF_FF], // 198.18/15 benchmarking
  [0xC6_33_64_00, 0xC6_33_64_FF], // 198.51.100/24 TEST-NET-2
  [0xCB_00_71_00, 0xCB_00_71_FF], // 203.0.113/24 TEST-NET-3
  [0xE0_00_00_00, 0xFF_FF_FF_FF], // 224/4 multicast + 240/4 reserved + 255.255.255.255
] as const

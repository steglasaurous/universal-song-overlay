export interface SynthRidersGameSpecificData {
  // Common
  noFailEnabled: boolean;
  spinEnabled: boolean;

  spinMode: number; // 0 = 90, 1 = 180, 2 = 360, 3 = 360+
  spinIntensity: number; // 1 = wild, 2 = mild, 0 = styled (yes, not intuitive - but it's what the game does)
  spiralEnabled: boolean;
  spiralIntensity: number; // 1 = mild, 2 = styled, 3 = chuck (wild)
  obstaclesEnabled: boolean;
  noteJumpSpeed: number; // 0 = 1 NJS, 1 = 2 NJS, 2 = 3 NJS
  suddenDeathEnabled: boolean;
  vanishNotesEnabled: boolean;
  prismaticNotesEnabled:boolean;
  noteSize: number; // 0 = default, 1 = small, 2 = big
  oneHandModeEnabled: boolean;
  isExperienceStage: boolean;
  isForceMode: boolean; // false == rhythm mode, true == force mode
  haloEnabled: boolean;
}

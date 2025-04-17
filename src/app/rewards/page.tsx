import RewardsComponent from "./Rewards";
import Statistics from "./statistics";
import PrismaFee from "./PrismaFee";
import StabilityPool from "./StablityPool";
import LPTokens from "./LPTokens";
import BoostDelegationFee from "./BoostDelegationFee";

export default function Rewards() {
  return (
    <div className="min-h-screen mx-design space-y-4">
      <Statistics />
      <RewardsComponent />
      <PrismaFee />
      <StabilityPool />
      <LPTokens />
      <BoostDelegationFee />
    </div>
  );
}

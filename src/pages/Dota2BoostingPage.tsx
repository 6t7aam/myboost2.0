import Dota2ServiceGrid from "@/components/Dota2ServiceGrid";
import { gameConfigs } from "@/data/gameConfigs";

const Dota2BoostingPage = () => <Dota2ServiceGrid config={gameConfigs["dota-2"]} />;

export default Dota2BoostingPage;

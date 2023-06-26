import AddPrompt from "../AddPrompt/AddPrompt.component";
import TitleBar from "../TitleBar/TitleBar";
import { Divider, Text } from "@chakra-ui/react";
import { Logo } from "./Logo";
import CustomIconButton from "../CustomIconButton/CustomIconButton.component";
import { AddIcon, EditIcon, RepeatClockIcon, StarIcon } from "@chakra-ui/icons";
import SideBarButton from "../SideBarButtons/SideBarButton.component";
import { HeartIcon } from "./HeartIcon";

const Dashboard = () => {
  return (
    <div className="dashboardWindow">
      <div className="leftStatusBar">
        <TitleBar />
        <Logo className="logo" />
        <div className="promptOptionsHeader">
          <Text color={"#787C83"}>Prompt</Text>
          <CustomIconButton size="xs" iconText={<AddIcon width='12px' color='grey' />} flat backgroundColour="var(--light-overlay-color)" />
        </div>
        <div className="promptOptions">
          <SideBarButton icon={<EditIcon />} text='All Prompts' />
          <SideBarButton icon={<HeartIcon />} text='Favorites' />
          <SideBarButton icon={<RepeatClockIcon />} text='Recent used' />
          <SideBarButton icon={<StarIcon />} text='Most used' />
        </div>
      </div>
      <Divider borderColor="rgba(255,255,255, 0.1)" marginTop="5px" marginBottom="10px" marginLeft={0} orientation="vertical" />
      <div >
        <AddPrompt />
      </div>
    </div>
  )
}

export default Dashboard;
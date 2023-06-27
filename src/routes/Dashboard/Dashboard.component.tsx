import TitleBar from "../../components/TitleBar/TitleBar.component";
import { Divider, Text } from "@chakra-ui/react";
import { Logo } from "../../components/Icons/PromptClipLogo";
import { AddIcon, EditIcon, RepeatClockIcon, StarIcon } from "@chakra-ui/icons";
import SideBarButton from "../../components/SideBarButtons/SideBarButton.component";
import { HeartIcon } from "../../components/Icons/HeartIcon";
import CustomButton from "../../components/CustomButton/CustomButton.component";
import AddPrompt from "./routes/AddPrompt/AddPrompt.component";
import ViewAllPrompts from "./routes/ViewAllPrompts/ViewAllPrompts";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

const routes = {
  allPrompts: '/dashboard',
  addPrompt: '/dashboard/add-prompt',
  favorites: '/dashboard/favorites',
  recentUsed: '/dashboard/recent-used',
  mostUsed: '/dashboard/most-used',
}

const Dashboard = () => {
  const location = useLocation();
  const nav = useNavigate();
  console.log(location.pathname);
  return (
    <div className="dashboardWindow">
      <div className="leftSideBar">
        <TitleBar />
        <Logo className="logo" />
        <div className="promptOptionsHeader">
          <Text color={"#787C83"}>Prompt</Text>
        </div>
        <div className="promptOptions">
          <SideBarButton icon={<EditIcon />} to={routes.allPrompts} active={location.pathname === routes.allPrompts} text='All Prompts' />
          <SideBarButton icon={<AddIcon />} to={routes.addPrompt} active={location.pathname === routes.addPrompt} text='Add Prompt' />
          <SideBarButton icon={<HeartIcon />} to={routes.favorites} active={location.pathname === routes.favorites} text='Favorites' />
          <SideBarButton icon={<RepeatClockIcon />} to={routes.recentUsed} active={location.pathname === routes.recentUsed} text='Recent used' />
          <SideBarButton icon={<StarIcon />} to={routes.mostUsed} active={location.pathname === routes.mostUsed} text='Most used' />
        </div>
      </div>
      <Divider borderColor="rgba(255,255,255, 0.1)" marginTop="5px" marginBottom="10px" marginLeft={0} orientation="vertical" />
      <div className="rightWindow">
        <div className="topStatusBar">
          <div>
            <Text fontWeight={'bold'} fontSize='14px'>Welcome back</Text>
            <Text color='rgba(255,255,255, 0.7)' fontSize='11px'>Manage all your AI prompts in one place</Text>
          </div>
          <CustomButton icon={<AddIcon />} onClick={() => { nav(routes.addPrompt) }}>Add New</CustomButton>
        </div>
        <Divider borderColor="rgba(255,255,255, 0.1)" marginTop="20px" marginBottom="24px" marginLeft={0} orientation="horizontal" style={{
          position: 'relative',
          left: '-32px',
          width: 'calc(100% + 64px)',
        }} />
        <div>
          <Routes>
            <Route path="/" element={<ViewAllPrompts />} />
            <Route path="/add-prompt" element={<AddPrompt />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

import { Button } from "@chakra-ui/react";
import AddPrompt from "./AddPrompt/AddPrompt.component";
import { Fragment } from "react"
import { getPrompts } from "../../utils/database";

const Dashboard = () => {
  return (
    <Fragment>
      <AddPrompt />
      <Button onClick={async () => {console.log(await getPrompts())}}>Get prompts</Button>
    </Fragment>
  )
}

export default Dashboard;
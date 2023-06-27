StarIcon
import { Box, Text } from "@chakra-ui/react";
import { StarIcon } from "../Icons/StarsIcon";
import { UsedForIcon } from "../Icons/UsedForIcon";
import { EditIcon } from "../Icons/EditIcon";
import { IPrompt } from "../../routes/Search/Prompts/Prompts.component";

const DetailedPrompt: React.FC<IPrompt> = ({ promptName, prompt }) => {
    return (
        <Box style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: 'var(--lighter-overlay-color)',
            borderRadius: '10px',
            padding: '16px',
            marginTop: '16px',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
                <StarIcon width="24px" height="24px" marginRight="12px" />
                <div style={{
                    width: '506px'
                }}>
                    <Text fontWeight={'bold'} color={"white"}>{promptName}</Text>
                    <Text color={"grey"} textOverflow='ellipsis' overflow='hidden' whiteSpace={'nowrap'}>{prompt}</Text>
                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    marginRight: '24px',
                }}>
                    <UsedForIcon width="18px" height="18px" marginRight="4px" />
                    <Text fontSize={'14px'} color={"grey"} marginTop={'-2px'} >14</Text>
                </div>
                <EditIcon marginTop='1px' cursor='pointer' onClick={() => {console.log("Hei")}}/>
            </div>
        </Box>
    )
};

export default DetailedPrompt;


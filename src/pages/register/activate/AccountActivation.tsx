import AccountActivationScreen from "@/components/AccountActivationScreen/AccountActivationScreen";
import { Flex } from "antd";
export default function AccountActivation() {
    return (
        <Flex justify="center" align="center" style={{ height: "100vh", transform: 'translateY(-80px)' }}>
        <div>
            <AccountActivationScreen />
        </div>
    </Flex>
    );
}
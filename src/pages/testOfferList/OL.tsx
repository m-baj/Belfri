import OfferList from "@/components/OfferList/OfferList";
import React from "react";
import { Flex } from "antd";

export default function OL() {
    return (
        <Flex justify="center" align="flex-top">

            <OfferList search_or_teacherID={true} search={"chuj"}/>

        </Flex>
    );
}
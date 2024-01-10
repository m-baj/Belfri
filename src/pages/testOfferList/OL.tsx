import OfferList from "@/components/OfferList/OfferList";
import React from "react";
import { Flex } from "antd";

export default function OL() {
    return (
        <Flex justify="center" align="flex-top">

            <OfferList compact={true} teacherID={5}/>

        </Flex>
    );
}
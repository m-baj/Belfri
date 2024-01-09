import OfferCard from "@/components/OfferCard/OfferCard";
import { OfferCardProps } from "@/components/OfferCard/OfferCard";
import { Flex } from "antd";
import React from "react";

const test_offer: OfferCardProps = {
    id: 2,
}


export default function TestOfferForm() {
    return (
        <Flex justify="center" align="center" style={{ height: "100vh", width: "50vh" }}>
                <OfferCard {...test_offer} />
        </Flex>
);
}
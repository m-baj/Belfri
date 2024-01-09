import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List } from "antd";
import React, { useEffect, useState } from "react";
import { OfferData, TeacherData, OfferFormProps } from "../OfferCard/OfferCard";
import OfferCard from "../OfferCard/OfferCard";
import axios from "axios";


export default function OfferList() {
    const [loading, setLoading] = useState<boolean>(false);
    const [offers, setOffers] = useState<OfferData[]>([]);

    const loadMoreData = () => {
        if (loading) {
            return;
        }
    setLoading(true);
    // fetch more data from api database
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return(
        <div>
        <InfiniteScroll
            dataLength={offers.length}
            next={loadMoreData}
            hasMore={offers.length < 5}
            loader={<h4>Loading...</h4>}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            >
            <List
                dataSource={offers}
                renderItem={(item) => (
                    <List.Item>
                        <OfferCard {...item} />
                    </List.Item>
                )}
            />
        </InfiniteScroll>
        </div>
    )
}
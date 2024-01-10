import { List, message, Skeleton, Button } from "antd";
import React, { useEffect, useState } from "react";
import OfferCard from "../OfferCard/OfferCard";
import axios from "axios";
import { OFFERS_TO_GENERATE, OFFERS_TO_GENERATE_ON_SCROLL } from "@/components/OfferList/OfferList.config";

export default function OfferList() {
    const [loading, setLoading] = useState<boolean>(false);
    const [offerIDs, setOfferIDs] = useState<number[]>([]);
    const [hasMoreOffers, setHasMoreOffers] = useState<boolean>(true); // New state to track if there are more offers

    const loadMoreData = () => {
        if (loading || !hasMoreOffers) {
            return;
        }

        setLoading(true);

        axios.get(`/api/offers?first=${offerIDs.length}&count=${OFFERS_TO_GENERATE}`, { withCredentials: true })
            .then((response) => {
                const newOfferIDs = response.data.data.offers;

                if (newOfferIDs.length === 0) {
                    // No more offers, set state to disable the "load more" button
                    setHasMoreOffers(false);
                } else {
                    setOfferIDs([...offerIDs, ...newOfferIDs]);
                }

                setLoading(false);
            })
            .catch((err: any) => {
                if (err.response && err.response.status === 400) {
                    // No more offers, set state to disable the "load more" button
                    setHasMoreOffers(false);
                } else {
                    console.log(err);
                    message.error(`Failed to load offers: ${err.message}`);
                }

                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    const loadMoreButton = hasMoreOffers ? (
        <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button onClick={loadMoreData}>Load More</Button>
        </div>
    ) : (
        <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button disabled={true}>No more offers</Button>
        </div>
    )

    return (
        <>
            <List
                dataSource={offerIDs}
                loadMore={loadMoreButton}
                renderItem={(item) => (
                    <List.Item key={item}>
                        <OfferCard id={item} />
                    </List.Item>
                )}
            />
        </>
    );
}

import { List, message, Skeleton, Button } from "antd";
import React, { useEffect, useState } from "react";
import OfferCard from "../OfferCard/OfferCard";
import axios from "axios";
import { OFFERS_TO_GENERATE, OFFERS_TO_GENERATE_ON_SCROLL } from "@/components/OfferList/OfferList.config";
import search from "@/pages/api/category/search";

interface OfferListProps {
    compact?: boolean;
    teacherID?: number;
    skip?: number;
    search?: string;
    city?: string;
    search_or_teacherID?: boolean;
}

// To use this component, you need to pass in a teacherID prop,
// which is the ID of the teacher whose offers you want to display.
// If you want to display all offers, pass in compact={false} instead.
export default function OfferList(props: OfferListProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [offerIDs, setOfferIDs] = useState<number[]>([]);
    const [hasMoreOffers, setHasMoreOffers] = useState<boolean>(true); // New state to track if there are more offers
    const [forceUpdate, setForceUpdate] = useState<boolean>(false);
    const loadMoreData = (init = offerIDs) => {
        if (loading || !hasMoreOffers) {
            return;
        }
        setLoading(true);
        if (props.search_or_teacherID) {
            console.log("dupa");
            axios.get(`/api/offers?search=${props.search}&cityID=${props.city}`, { withCredentials: true })
                .then((response) => {
                    const newOfferIDs = response.data.data.offers;
                    console.log(newOfferIDs);
                    // console.log(offerIDs);
                    if (newOfferIDs.length === 0) {
                        // No more offers, set state to disable the "load more" button
                        setHasMoreOffers(false);
                    } else {
                        setOfferIDs([...init, ...newOfferIDs]);
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
        } else {
            if (props.compact) {
                axios.get(`/api/offers?teacherID=${props.teacherID}`, { withCredentials: true })
                    .then((response) => {
                        const newOfferIDs = response.data.data.offers;
                        console.log(newOfferIDs);
                        console.log(offerIDs);
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
            } else {
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
            }
        }
    };
    useEffect(() => {
        loadMoreData([]);
    }, [props.search, props.city]);
    const loadMoreButton = hasMoreOffers ? (
        <div
            style={{
                textAlign: "center",
                marginTop: 12,
                height: 32,
                lineHeight: "32px"
            }}
        >
            <Button onClick={() => {
                loadMoreData();
            }}>Load More</Button>
        </div>
    ) : (
        <div
            style={{
                textAlign: "center",
                marginTop: 12,
                height: 32,
                lineHeight: "32px"
            }}
        >
            <Button disabled={true}>No more offers</Button>
        </div>
    );
    if (props.search_or_teacherID) {
        return (
            <>
                <List
                    dataSource={offerIDs}
                    renderItem={(item) => (
                        <List.Item key={item}>
                            <OfferCard id={item} compact={false} />
                        </List.Item>
                    )}
                />
            </>
        );
    }
    if (!props.compact) {
        return (
            <>
                <List
                    dataSource={offerIDs}
                    loadMore={loadMoreButton}
                    renderItem={(item) => (
                        <List.Item key={item}>
                            <OfferCard id={item} compact={false} />
                        </List.Item>
                    )}
                />
            </>
        );
    }
    if (props.compact) {
        return (
            <>
                <List
                    dataSource={offerIDs}
                    renderItem={(item) => (
                        <List.Item key={item}>
                            <OfferCard id={item} compact={true} />
                        </List.Item>
                    )}
                />
            </>
        );
    }
}

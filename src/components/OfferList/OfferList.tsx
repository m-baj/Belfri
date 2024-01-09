import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, List } from "antd";
import React, { useEffect, useState } from "react";
import OfferCard from "../OfferCard/OfferCard";
import axios from "axios";


// export default function OfferList() {
//     const [loading, setLoading] = useState<boolean>(false);
//     const [offer_ids, setOffers] = useState<number[]>([]);
//
//     const loadMoreData = () => {
//         if (loading) {
//             return;
//         }
//     setLoading(true);
//     // fetch more data from api database
//     };
//
//     useEffect(() => {
//         loadMoreData();
//     }, []);
//
//     return(
//         <div>
//         <InfiniteScroll
//             dataLength={offer_ids.length}
//             next={loadMoreData}
//             hasMore={offer_ids.length < 6}
//             loader={<h4>Loading...</h4>}
//             endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
//             >
//             <List
//                 dataSource={offer_ids}
//                 renderItem={(item) => (
//                     <List.Item>
//                         <OfferCard {...item} />
//                     </List.Item>
//                 )}
//             />
//         </InfiniteScroll>
//         </div>
//     )
// }
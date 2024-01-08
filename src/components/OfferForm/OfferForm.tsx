interface OfferData {
    offer_id: number;
    teacher_id: number;
    category_id: number;
    city_id: number;
    name: string;
    description: string;
    rating: number;
}

interface TeacherData {
    teacher_id: number;
    user_id: number;
    iban_number: string;
    phone_number: string;
    contract: string;
    profile_picture: Buffer;
}
interface OfferFormProps {
    offer: OfferData;
    teacher: TeacherData;
}

export default function OfferForm(props: OfferFormProps) {
    return (
        <div>
            <h1>OfferForm</h1>
            <p>Offer ID: {props.offer.offer_id}</p>
            <p>Teacher ID: {props.offer.teacher_id}</p>
            <p>Category ID: {props.offer.category_id}</p>
            <p>City ID: {props.offer.city_id}</p>
            <p>Name: {props.offer.name}</p>
            <p>Description: {props.offer.description}</p>
            <p>Rating: {props.offer.rating}</p>
            <p>Teacher ID: {props.teacher.teacher_id}</p>
            <p>User ID: {props.teacher.user_id}</p>
            <p>IBAN Number: {props.teacher.iban_number}</p>
            <p>Phone Number: {props.teacher.phone_number}</p>
            <p>Contract: {props.teacher.contract}</p>
            <p>Profile Picture: {props.teacher.profile_picture}</p>
        </div>
    );
}

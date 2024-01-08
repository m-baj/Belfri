import OfferCard from "@/components/OfferCard/OfferCard";
import { OfferData, TeacherData, OfferFormProps } from "@/components/OfferCard/OfferCard";
import { Flex } from "antd";

const testOffer: OfferData = {
    offer_id: 1,
    teacher_id: 2,
    category_id: 3,
    city_id: 4,
    name: "Test Offer",
    description: "Oferuję korepetycje z matematyki dla uczniów szkół" +
        " podstawowych i średnich. Posiadam doświadczenie w nauczaniu " +
        "oraz pasję do przekazywania wiedzy matematycznej w sposób zrozumiały " +
        "i atrakcyjny. Pomagam w rozumieniu trudnych zagadnień, udzielam" +
        " dodatkowych wyjaśnień oraz przygotowuję do egzaminów." +
        " Indywidualne podejście do każdego ucznia. Zapraszam do kontaktu, aby razem odnieść sukces w nauce matematyki!",
    rating: 5,
};
const testTeacher: TeacherData = {
    teacher_id: 1,
    user_id: 2,
    iban_number: "Test IBAN",
    phone_number: "Test Phone Number",
    contract: "Test Contract",
    profile_picture: Buffer.from("https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"),
};

const testOfferFormProps: OfferFormProps = {
    offer: testOffer,
    teacher: testTeacher,
};

export default function TestOfferForm() {
    return (
        <Flex justify="center" align="center" style={{ height: "100vh" }}>
            <div>
                <OfferCard {...testOfferFormProps} />
            </div>
        </Flex>
    );
}
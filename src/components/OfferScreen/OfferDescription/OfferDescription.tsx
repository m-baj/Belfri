import axios from "axios";
import { Flex, message, Typography } from "antd";
import { blue } from "@ant-design/colors";

export default function OfferDescription() {

    // axios.get( '/api/offer' )
    // .then( ( response ) => {
    //     const subjectName = response.data.subjectName;
    //     const subjectDescription = response.data.subjectDescription;
    //     const pricePerHour = response.data.subjectPrice;
    // } )
    // .catch( ( error ) => {
    //     message.error( error.response.data.message );
    // } );


    const offerName = "Matematyka";
    const offerDescription = "Drogi uczniu!\n" +
        "\n" +
        "Stresujesz się na każdej lekcji, bo nie nadążasz za nowymi tematami z matmy, a z poprzednich klas już niewiele pamiętasz?\n" +
        "Chcesz odetchnąć z ulgą, wiedząc, że magiczne 30% na maturze przekroczysz z pewnym zapasem?\n" +
        "Nie czujesz się pewnie przed egzaminem ósmoklasisty , a zależy Ci, żeby iść do dobrego liceum lub technikum?\n" +
        "Chcesz dostać się na wymarzony kierunek i szukasz zaprawionego w boju eksperta, który zna egzamin maturalny na rozszerzeniu na wylot?\n" +
        "A może szukasz po prostu kogoś, kto wydobędzie z Ciebie cały potencjał?\n" +
        "Jeśli tak, będę mógł Ci pomóc :)\n" +
        "\n" +
        "MOJE MOCNE STRONY\n" +
        "(czyli co mnie wyróżnia spośród innych korepetytorów ;)\n" +
        "\n" +
        "1. KSZTAŁTOWANIE WYOBRAŹNI MATEMATYCZNEJ\n" +
        "\n" +
        "Jest to umiejętność, o której zapomniano w naszym systemie edukacji , a to właśnie od tego należy zacząć, aby tworzyć fundamenty potrzebne do rozumienia wielu działów tego przedmiotu.\n" +
        "Matematyka otacza nas ze wszystkich stron i to dzięki wyobraźni odnajdujemy w naturalny sposób połączenia logiczne , które pozwalają nam ją lepiej zrozumieć. \n" +
        "A wraz ze zrozumieniem przychodzi zainteresowanie oraz fascynacja , która działa na uczniów w sposób motywujący i przynosi duuuużo radości :)\n" +
        "\n" +
        "2. AKCENT POŁOŻONY NA ZAGADNIENIACH POWTARZAJĄCYCH SIĘ NAJCZĘŚCIEJ NA EGZAMINACH\n" +
        "\n" +
        "Przede wszystkim ilość materiału wynikająca z podstawy programowej jest za duża , aby można było ją opanować i mieć sporo wolnego czasu dla siebie. Standardowe podejście polegające na próbie opanowania wszystkiego niestety tu zawodzi. Jednak mam na to rozwiązanie. \n" +
        "\n" +
        "Słyszałeś o zasadzie Pareto?\n" +
        "\n" +
        "Mówi ona o tym, że 20% jednostek odpowiada za 80% efektów, np.:\n" +
        "\n" +
        "20% ludzi na świecie ma 80% pieniędzy,\n" +
        "20% uczniów zadaje 80% spośród wszystkich pytań w trakcie lekcji,\n" +
        "20% kolegów z Twojej klasy angażuje się w 80% zajęć dodatkowych. - itd. \n" +
        "Od ponad 10 lat śledzę wymagania maturalne CKE , wytyczne testu ósmoklasisty, podstawy programowe i omawiam arkusze maturalne z egzaminatorami.\n" +
        "Wiem, które zagadnienia odpowiadają za większość Twojego wyniku na sprawdzianie, teście 8-klasisty czy maturze.  Wiem, które 20% może stanowić 80% Twojego wyniku. :-)  \n" +
        "\n" +
        "3. STARANNE PLANOWANIE CAŁEGO PROCESU NAUCZANIA I UWZGLĘDNIENIE POWTÓREK\n" +
        "\n" +
        "Kolejny wielki problem to fakt, że niemal nikt nie pamięta materiału dłużej niż miesiąc po sprawdzianie. Jak sobie z tym poradzić? Długo szukałem odpowiedzi, ale najlepszą znalazłem w: „Harvardzkim Poradniku Skutecznego Uczenia Się” , z którego wynika, iż jedynym sposobem zapamiętania czegoś na trwałe są dobrze zaplanowane powtórki.\n" +
        "\n" +
        "Powinny one odbyć się po:\n" +
        "\n" +
        "24 godzinach,\n" +
        "tygodniu,\n" +
        "miesiącu,\n" +
        "trzech miesiącach.\n" +
        "Na początku miałem wątpliwości, czy to się sprawdzi, czy to nie jest tylko teoria, ale dzisiaj jestem pewien, że to gwarantuje zapamiętanie wiedzy na stałe .\n" +
        "Dobry nauczyciel przypomina uczniowi o jego powtórkach, aby ten mógł spać spokojnie. :)\n" +
        "\n" +
        "4.  „POWRÓT DO PRZESZŁOŚCI” I EKSPRESOWE UZUPEŁNIENIE BRAKÓW\n" +
        "\n" +
        "Niestety uczniom bardzo często brakuje systematyczności. Rozwiązują zadania sporadycznie i mają braki w tematach z poprzednich klas. Zagadnienia na matematyce przeplatają się i materiał ze szkoły podstawowej wykorzystujemy w szkole średniej.\n" +
        "Dlatego przed wytłumaczeniem danego tematu, w umiejętny sposób należy zbadać stan wiedzy ucznia i uzupełnić braki z przeszłości w trybie ekspresowym, aby obecnie przerabiany materiał stał się zrozumiały!\n" +
        "\n" +
        "5. WSPARCIE MOTYWACYJNE\n" +
        "\n" +
        "Wielu nauczycieli nie zdaje sobie z tego sprawy, ale dobry nauczyciel jest jak trener sportowy.\n" +
        "Misja korepetytora nie kończy się na prowadzeniu lekcji, ale na tym się zaczyna.  \n" +
        "Gdy po zajęciach przychodzi czas, kiedy zawodnik – uczeń – musi zrobić swoje, trzeba zagrzać go do walki. W tym należy dopasować odpowiednie  systemy motywacyjne i techniki pamięciowe , które pomagają skutecznie uczyć się w domu, aby potem maksymalnie wykorzystać czas na zajęciach. \n" +
        "Prowadzę uczniów do upragnionych celów, tak jak trener prowadzi sportowca do zawodów.\n" +
        "Biorę na barki całą odpowiedzialność , cieszę się z postępów, ale w szczególności wspieram w trudniejszych chwilach.\n" +
        "\n" +
        "MOJE SPECJALIZACJE\n" +
        "\n" +
        "⚔ \"Nie Toń Humanisto!\"  - ratuję uczniów z najgorszych opałów i tłumaczę matematykę humanistom. Podczas tych zajęć mobilizuję pokłady cierpliwości i wyobraźni do maksimum, aby każde zagadnienie wytłumaczyć na tyle sposobów, na ile to potrzebne ;)\n" +
        "\n" +
        "♚ Saper egzaminacyjny  - znam na wylot egzaminy ósmych klas oraz matury. Co roku szczegółowo analizuję egzaminy i na zajęciach rozminowuję ich najcięższe elementy, tak aby nie wybuchły podczas batalii egzaminacyjnej :)\n" +
        "\n" +
        "♛ Matematyczny komandos , czyli specjalista od matur rozszerzonych oraz poziomu akademickiego. Pomagam ambitnym uczniom wzbić się na najwyższe progi punktowe. To najbardziej wymagające zajęcia - wróżę na nich z całek i odtwarzam liczbę pi do 100 miejsc po przecinku (poziom akademicki - do 250), a przed zajęciami ustawiam kubek z herbatą w pozycji zależnej od współczynnika kierunkowego funkcji.\n" +
        "\n" +
        "METODY NAUCZANIA\n" +
        "\n" +
        "Dysponuję wszelkimi potrzebnymi podręcznikami, zbiorami zadań i arkuszami egzaminów próbnych. Śledzę wymagania CKE , podstawy programowe i omawiam arkusze maturalne z egzaminatorami, dzięki czemu jestem zawsze na bieżąco z materiałem. \n" +
        "\n" +
        "Albert Einstein powiedział kiedyś: “Obłęd: powtarzać w kółko tą samą czynność oczekując innych rezultatów.”, a także: “Logika zaprowadzi cię z punku A do punktu B. Wyobraźnia zaprowadzi cię wszędzie.” Na moich zajęciach korzystam z tych dwóch prawd.\n" +
        "\n" +
        "Jeśli nie zrozumiesz czegoś za pierwszym razem - wytłumaczę Ci to ponownie, tym razem w inny sposób. Lewa półkula Twojego mózgu odpowiada za analityczne myślenie, prawa - za kreatywne. Gdy zachęci się obie te części do współpracy, osiąga się niesamowite wyniki! Właśnie dlatego w swoich metodach nauczania łączę logikę z wyobraźnią - tak, byś efektywnie przyswajał sobie wiedzę. \n" +
        "\n" +
        "W swojej pracy wykorzystuję  ciekawe taktyki, skojarzenia, techniki pamięciowe –  wszystko, co w naszej mocy, by matematyka nie była dla ucznia zmorą, a przedmiotem, który jednak da się polubić – i nie stracić przy tym wszystkich nerwów. Nasi podopieczni przychodzą na zajęcia pełni zapału i z otwartymi umysłami – bo wiemy, jak skutecznie zachęcić ich do nauki.\n" +
        "\n" +
        "Często zdarza się, że uczeń miał w planach przyjść tylko na jedne zajęcia, by powtórzyć materiał przed sprawdzianem – a został na kilka miesięcy, bo tak dobrze nam się razem pracowało. :) Dbam o to, by na zajęciach panowała przyjemna atmosfera. Jestem wyrozumiały, ale i wymagający  – bo wiem, że tylko taka postawa przynosi rezultaty. Jeśli będziesz współpracował i uczył się z lekcji na lekcję – gwarantuję, że osiągniesz sukces.\n" +
        "\n" +
        "Nie obiecuję, że będzie lekko, ale uwierz mi, że warto!\n" +
        "\n" +
        "GDZIE I KIEDY MOŻEMY UMÓWIĆ SIĘ NA ZAJĘCIA:\n" +
        "\n" +
        "lekcje online -  profesjonalne zajęcia z użyciem specjalnego tabletu graficznego oraz wirtualnej tablicy,  czyli zupełnie jakbyśmy siedzieli obok siebie w jednej ławce. ;-) Na zajęciach jest ciągła interakcja, nie ma możliwości obijania i siedzenia na komórce :)\n" +
        "Zajęcia mogą odbywać się w stałych lub elastycznych godzinach między 8:00 - 22:00 (pn – niedz)\n" +
        "CENNIK\n" +
        "\n" +
        "UWAGA: ZAJĘCIA STACJONARNE W GDYNI -- WSZYSTKIE PONIŻSZE CENY -10zł \n" +
        "\n" +
        "Szkoła podstawowa (online lub stacjonarnie) - 95 zł / 60 min\n" +
        "Liceum - poziom podstawowy (online lub stacjonarnie) – 115 zł / 60min\n" +
        "Liceum - poziom rozszerzony (online lub stacjonarnie) – 135 zł / 60min\n" +
        "Poziom akademicki (online lub stacjonarnie) – 155 zł / 60min\n" +
        "Matematyka to królowa nauk, a ja sprawię, że Ty zostaniesz królem - lub królową - matematyki. :)\n" +
        "\n" +
        "Tel: 519 530 715\n" +
        "\n" +
        "Wszelkie prawa zastrzeżone. Kopiowanie, powielanie i wykorzystywanie części lub całości treści ogłoszenia bez zgody autora jest zabronione pod groźbą sankcji prawnych."

    const paragraphs = offerDescription.split('\n').map((paragraph, index) => {
       return ( <Typography.Paragraph key={index} style={{marginLeft: "10%", marginRight: "10%", marginBottom: "0"}}>
            {paragraph}
        </Typography.Paragraph> )
    });

    return (
        <Flex vertical align="flex-start" style={
            {justifyContent: "center"
            }}>

            <Typography.Title level={ 1 } style={{color: blue[4], width: "100%", marginLeft: "10%"}}>{ offerName }</Typography.Title>
                <div style={{borderLeft: "1px solid", borderRight: "1px solid", borderLeftStyle: "groove", borderRightStyle: "groove"}}>
                    {paragraphs}
                </div>
        </Flex>
    );
}
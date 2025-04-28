import {render,screen, waitFor,queryByTestId} from "@testing-library/react";
import api from "../utils/api";
import List from "../components/list";
import Card from "../components/card";
import {mockData} from "../utils/constants";

// api modulünü mockla
jest.mock("../utils/api");

// card component'ını mockla
// şuan basit bir title bassada ileride daah acomplex bir component olucak ve by-undan dolayı list testlerini değiştirmek istemiyorum
jest.mock("../components/card");

describe("List bileşeni testleri", () => {
    // her testen sonra mock ayarlarını sıfırla
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("api'den cevap gelmediyse ekrana Loader basılır", async () => {
      // bu testte api isteği atılınca bu cevap dönsün
        api.get.mockResolvedValue({data:[]});

        // bileşeni renderla
        render(<List/>);

        // ekrana loader vardır
        screen.getByTestId("loader");

        // belirli bir süre ardından loader ekrandan gider
        await waitFor(() => {
            expect(screen.queryByTestId("loader")).toBeNull();
        });
    });

    it("api'den hata cevabı gelirse ekrana Error basılır", async () => {
        // api.get çalışınca error dönsün
        api.get.mockRejectedValueOnce(new Error("hata oldu"));


        // bileşeni renderla
        render(<List/>);

        await waitFor(() => screen.getByTestId("error"));
    });

    it("api'den başarılı cevap gelince ekrana Card'lar basılır", async () => {
        // cardların yerine basılacak içeriği belirle
        Card.mockImplementation(({item}) => <div>{item.name} </div>);

        // api.get isteği atılınca  dondurma  verilerini döndür
        api.get.mockResolvedValueOnce({data: mockData});

        // bileşeni renderla
        render(<List/>);

            // belirli bir sürenin ardından api.get'den dönen dizideki her bir veri için ekrana bir tane kart basılır
            await waitFor(() => {
                mockData.forEach((item) => {
                    screen.getByText(item.name);
                });
            });
    });
});
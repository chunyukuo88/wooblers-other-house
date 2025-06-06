import {ImageCard, processRawCaption} from "@/components/galleries/image-card";
import {render, screen} from "@testing-library/react";
import {SingleCardProps} from "@/components/galleries/types";
import {SessionProvider} from "next-auth/react";

describe("<ImageCard />", () => {
  describe('GIVEN: props of file, index, and caption', () => {
    describe('WHEN: the caption is an empty string', () => {
      test('THEN: no caption tag is displayed', () => {
        const caption = "";
        const props: SingleCardProps = {
          file: {
            key: "12345_captions.jpg",
            lastModified: "",
            size: 123,
            url: "https://www.test.com",
          },
          index: 1,
          caption,
        };

        const { container } = render(
          <SessionProvider session={{}}>
            <ImageCard {...props} />
          </SessionProvider>
        );

        const img = container.querySelector(".woh__image-item");
        const captionTag = container.querySelector(".woh__image-caption");

        expect(img).toBeVisible();
        expect(captionTag).toBeNull();
      });
    });
    describe('WHEN: the caption string has content', () => {
      test('THEN: a caption tag is displayed', async () => {
        const caption = "IMG_1234578@Woobler playing in the sand";
        const props: SingleCardProps = {
          file: {
            key: "12345_captions.jpg",
            lastModified: "",
            size: 123,
            url: "https://www.test.com",
          },
          index: 1,
          caption,
        };
        const expectedDisplayText = processRawCaption(caption);

        render(
          <SessionProvider session={{}}>
            <ImageCard {...props} />
          </SessionProvider>
        );

        const captionTag = await screen.findByTestId("display-caption");

        expect(captionTag).toBeVisible();
        expect(captionTag).toHaveTextContent(expectedDisplayText);
      });
    });
  });
});

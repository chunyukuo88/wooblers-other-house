import {ImageCard, processRawCaption} from "@/components/galleries/image-card";
import {render, screen} from "@testing-library/react";
import {GALLERY_BUCKETS, SingleCardProps} from "@/components/galleries/types";
import {SessionProvider} from "next-auth/react";

describe("<ImageCard />", () => {
  describe('GIVEN: props of file, index, and caption', () => {
    describe('WHEN: the caption is an empty string', () => {
      test('THEN: no caption tag is displayed', () => {
        const caption = '';
        const props: SingleCardProps = {
          file: "12345.jpg",
          caption,
          galleryPrefix: 'https://woobler-photos-test.s3.us-east-1.amazonaws.com/',
          index: 123,
        };

        const { container } = render(
          <SessionProvider session={{ expires: ''}}>
            <ImageCard {...props} />
          </SessionProvider>
        );

        const img = container.querySelector(".woh__image-item");
        expect(img).toBeVisible();

        // const captionTag = container.querySelector(".woh__image-caption");
        // expect(captionTag).toBeNull();
      });
    });
    describe('WHEN: the caption string has content', () => {
      test('THEN: a caption tag is displayed', async () => {
        const caption = "IMG_1234578@Woobler playing in the sand";
        const props: SingleCardProps = {
          file: {
            key: "12345.jpg",
          },
          caption,
          galleryPrefix: 'https://woobler-bread.s3.us-east-1.amazonaws.com/',
          index: 123,
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

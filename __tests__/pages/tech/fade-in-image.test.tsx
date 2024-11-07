import FadeInImage from "../../../app/tech/fade-in-image";
import {render, screen} from "@testing-library/react";

describe('GIVEN: props that include `src`,', () => {
  describe('WHEN: the component renders', () => {
    test('THEN: includes a caption that labels the technology whose icon is pictured above it.', () => {
      render(
        <FadeInImage
          alt={"Some Technology Logo"}
          src={"/images/logo_SomeTechnology"}
          width={100}
          height={100}
          isVisible={true}
          fadeInFromThe={"left"}/>
      );

      const caption = screen.getByText("SomeTechnology");

      expect(caption).toBeVisible();
    });
  });
});
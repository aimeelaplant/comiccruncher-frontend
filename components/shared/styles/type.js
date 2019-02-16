import styled from 'react-emotion';
import { UI } from './colors';
import Spacing from './spacing';
import Responsive from './responsive';

const UIFontStack =
  'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol';
const BangersFontStack =
  'Bangers, -apple-system, BlinkMacSystemFont, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol';

const Size = {
  XXLarge: 120,
  XLarge: 80,
  Large: 32,
  Medium: 24,
  Default: 16,
  Small: 14,
  XSmall: 12,
};

const Weight = {
  Light: 200,
  Normal: 400,
  Medium: 500,
  Bold: 700,
};

const TextOutline = `-1px -1px 0 ${UI.Text.Dark},
  1px -1px 0 ${UI.Text.Dark},
  -1px 1px 0 ${UI.Text.Dark},
  1px 1px 0 ${UI.Text.Dark}`;

const TextOutlineBig = `-2px -2px 0 ${UI.Text.Dark},
  2px -2px 0 ${UI.Text.Dark},
  -2px 2px 0 ${UI.Text.Dark},
  2px 2px 0 ${UI.Text.Dark}`;

const TextShadow = `-4px 4px 0 ${UI.Text.Dark},
  -1px -1px 0 ${UI.Text.Dark},
  1px -1px 0 ${UI.Text.Dark},
  -1px 1px 0 ${UI.Text.Dark},
  1px 1px 0 ${UI.Text.Dark}`;

const YellowTitle = styled.div({
  color: UI.Text.Yellow,
  fontFamily: BangersFontStack,
  fontSize: '70px',
  letterSpacing: 5,
  fontWeight: Weight.Normal,
  textShadow: `${TextShadow}`,
  marginBottom: Spacing.Tiny,
  [Responsive.Tablet]: {
    fontSize: '2.8em',
  },
  [Responsive.Mobile]: {
    fontSize: '2.2em',
  },
});

const BlackTitle = styled.div({
  color: UI.Text.Dark,
  fontFamily: UIFontStack,
  fontSize: '20px',
  //letterSpacing: 2,
  marginTop: '20px',
  fontWeight: Weight.Normal,
  marginBottom: Spacing.Tiny,
  [Responsive.Tablet]: {
    fontSize: '1.3em',
  },
  [Responsive.Mobile]: {
    fontSize: '1.1em',
  },
});

const RedTitle = styled.div({
  color: UI.Text.Red,
  fontFamily: BangersFontStack,
  fontSize: Size.Large,
  letterSpacing: 5,
  fontWeight: Weight.Normal,
  textShadow: `${TextShadow}`,
});

const SubTitle = styled.div({
  color: UI.Text.White,
  fontFamily: UIFontStack,
  fontSize: Size.Large,
  lineHeight: 1.55,
  letterSpacing: 2,
  fontWeight: Weight.Bold,
  marginBottom: Spacing.Small,
  [Responsive.TabletAndBelow]: {
    fontSize: '1.4em',
  },
});

const SectionTitle = styled.div({
  color: UI.Text.Title,
  fontFamily: BangersFontStack,
  fontSize: `${Size.Large}px`,
  letterSpacing: 3,
  lineHeight: 1.3,
  fontWeight: Weight.Bold,
  marginBottom: Spacing.Tiny,
  [Responsive.TabletAndBelow]: {
    fontSize: '1.6em',
  },
});

const SectionByline = styled.div({
  color: UI.Text.Byline,
  fontFamily: UIFontStack,
  fontSize: Size.Default,
  lineHeight: 1.55,
  marginBottom: Spacing.Small,
});

const TextDefault = styled.p((props) => ({
  color: UI.Text.Default,
  fontFamily: UIFontStack,
  lineHeight: 1.5,
  fontSize: Size.Default,
  fontWeight: props.bold ? Weight.Bold : '',
  '& p': {
    marginTop: '10px',
  },
}));

const TextSearchResult = styled.div((props) => ({
  color: UI.Text.Default,
  fontFamily: UIFontStack,
  lineHeight: 1.5,
  fontSize: Size.Default,
  fontWeight: props.bold ? Weight.Bold : '',
}));

const TextSmall = styled.div((props) => ({
  color: UI.Text.Default,
  fontFamily: UIFontStack,
  lineHeight: 1.5,
  fontSize: Size.Small,
  fontWeight: props.bold ? Weight.Bold : '',
}));

const TextXSmall = styled.div((props) => ({
  color: UI.Text.Default,
  fontFamily: UIFontStack,
  lineHeight: 1.5,
  fontSize: Size.XSmall,
  fontWeight: props.bold ? Weight.Bold : '',
}));

const LabelDefault = styled.label({
  color: UI.Text.Default,
  fontFamily: UIFontStack,
  fontSize: Size.Default,
  marginBottom: Spacing.Tiny,
  display: 'block',
});

const HeadingH1 = styled.h1((props) => ({
  fontSize: props.fontSize || Size.Large,
  [Responsive.Tablet]: {
    fontSize: '1.8em',
  },
  [Responsive.Mobile]: {
    fontsize: '1.6em',
  },
}));

const HeadingH2 = styled.h2((props) => ({
  color: UI.Text.Default,
  fontFamily: UIFontStack,
  lineHeight: 1.5,
  fontSize: props.fontSize || Size.Medium,
  fontWeight: props.fontWeight || Weight.Medium,
  margin: '20px 0',
}));

const TextBlock = styled.p({
  color: UI.Text.Default,
  fontFamily: UIFontStack,
  lineHeight: 1.5,
  fontSize: Size.Default,
  marginTop: '20px',
});

const Type = {};
Type.Weight = Weight;
Type.Size = Size;
Type.TextShadow = TextShadow;
Type.TextOutline = TextOutline;
Type.TextOutlineBig = TextOutlineBig;

// Large Title
const Title = {};
Type.Title = Title;
Title.Large = YellowTitle;
Title.Medium = BlackTitle;
Title.Byline = SubTitle;
Title.Red = RedTitle;

// Section
const Section = {};
Type.Section = Section;
Section.Title = SectionTitle;
Section.Byline = SectionByline;

// Text
const Text = {};
Type.Text = Text;
Text.Default = TextDefault;
Text.Small = TextSmall;
Text.XSmall = TextXSmall;
Text.SearchResult = TextSearchResult;
Text.P = TextBlock;

// Label
const Label = {};
Type.Label = Label;
Label.Default = LabelDefault;

export { UIFontStack, BangersFontStack, Size, Weight, Title, Section, Text, Label, HeadingH1, HeadingH2 };

export default Type;

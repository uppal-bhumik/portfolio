/**
 * Renders a string, swapping every "&" for the classic roman
 * ampersand (.amp — Georgia) instead of Archivo's glyph.
 */
export default function AmpText({ text }: { text: string }) {
  const parts = text.split("&");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="amp">&amp;</span>}
        </span>
      ))}
    </>
  );
}

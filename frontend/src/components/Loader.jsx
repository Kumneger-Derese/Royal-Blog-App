export default function Loader({ size = 'loading-lg' }) {
  return (
    <div>
      <span className={`loading loading-bars  ${size}`}></span>
    </div>
  );
}

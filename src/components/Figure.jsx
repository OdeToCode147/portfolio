import { useLayoutEffect, useRef } from 'react';

// Mounts one Hairline figure. Same contract as '@lucasmarkes/hairline/react',
// but it takes the figure function directly so the bundle only carries the
// figures this site uses (the React entry pulls in all thirty-three).
export default function Figure({ mount, intensity, play, label, onRead, className = '' }) {
  const el = useRef(null);
  const figure = useRef(null);
  const read = useRef(onRead);

  useLayoutEffect(() => {
    read.current = onRead;
  });

  useLayoutEffect(() => {
    const f = mount(el.current, { intensity, play, label, onRead: (text) => read.current?.(text) });
    figure.current = f;
    return () => {
      f.destroy();
      figure.current = null;
    };
    // Mount once; option changes go through update() below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mount]);

  useLayoutEffect(() => {
    figure.current?.update({ intensity, play, label });
  }, [intensity, play, label]);

  return <div ref={el} className={className} style={{ aspectRatio: '5 / 4' }} />;
}

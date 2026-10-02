// lucide-react's published tarballs (>=0.544) declare
// "typings": "dist/lucide-react.d.ts" but ship NO .d.ts files at all
// (broken upstream publish), which makes Next's type check fail with TS7016.
// Shorthand ambient declaration as a workaround.
declare module 'lucide-react';

export const css = `* {
  font-size: 12px;
  font-family: 'Times New Roman';
}

td,
th,
tr,
table {
  border-top: 1px solid black;
  border-collapse: collapse;
  width: 100%;
}

td.description,
th.description {
  width: 75px;
  max-width: 75px;
  word-wrap: break-word;
}

td.quantity,
th.quantity {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

td.price,
th.price {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

.centered {
  text-align: center;
  align-content: center;
}

.ticket {
  width: 100%
}

img {
  max-width: inherit;
  width: inherit;
}

mt-1 {
  margin-top: 1rem
}

mb-1 {
  margin-bottom: 3rem
}

@media print {
  .hidden-print,
  .hidden-print * {
      display: none !important;
  }
}`;

<template>
  <div class="p-6 bg-gray-50 min-h-screen flex items-start justify-center gap-2">
    <!-- right side of the invoice -- pape side -->
    <div class="w-full max-w-3xl bg-white shadow-md rounded-lg" ref="invoiceEl">
      <div class="p-3 border-b">
        <div class="flex items-start gap-5">
          <div>
            <NuxtImg src="live-organization.jpeg" class="h-30 w-30 rounded-md" />
          </div>
          <div class="flex flex-col justify-center items-start my-5 gap-2">
            <div class="text-4xl! h-auto w-auto font-bold text-gray-500">
              {{ company.title }}
            </div>
            <div class="text-3xl! font-semibold">{{ company.sub_title }}</div>
          </div>
        </div>
      </div>

      <div class="p-2 border-b">
        <div class="flex items-center justify-between gap-5">
          <div class="text-sm text-gray-500">
            <span>{{ $t("invoice.number") }}</span> :
            <span>{{ invoice.number }}</span>
          </div>
          <div class="text-2xl! font-semibold">{{ $t("invoice.starter_form") }}</div>
          <div class="text-xl font-semibold">
            <span>{{ $t("date") }}</span> :
            <span>{{ invoice.date }}</span>
          </div>
        </div>
      </div>

      <div class="p-6">
        <div class="text-gray-900">
          من، كەژی ئەحمەد قادر دانیشتووی شاری سلێمانی، ڕەزامەندم بە وەرگرتنی جەلسەی
          بەشێوەی (چات وونامە ) لەگەڵ ڕاوێژکاری دەروونی ئاسۆکامەران
        </div>
        <div class="mt-6 text-sm text-gray-600 pt-4">
          <div class="font-medium text-xl text-gray-900">
            پابەندم بەم مەرجانەی لای خوارەوە: -
          </div>
          <ul class="space-y-3 font-medium text-xl mt-2">
            <li>
              ١: پابەندم بە پێدانی بڕی (١٥٠٠٠) پانزە هەزار دینار بۆ هەر جەلسەیەک کە لەگەڵ
              ڕاوێژکاری دەروونی، ئاسۆ کامەران وەریدەگرم بە شێوەی (قیست).
            </li>
            <li>
              ٢: پێویستم بە وەرگرتنی بیست و چوار جەلسەی ڕاوێژکارییە لەلایەن ڕاوێژکاری
              دەروونی، ئاسۆ کامەران.
            </li>
            <li>
              ٣: لە ئەگەری بەردەوام نەبوونم لە وەرگرتنی جەلسە ڕاوێژکارییەکان، هیچ ڕێکارێکی
              یاساییم لە دژ ناگیرێتە بەر لەلایەن ڕێکخراوی زیندووەوە.
            </li>
            <li>
              ٤: لە ئەگەری پەشیمان بوونەوەم لە وەرگرتنی جەلسەکان لە دوای پێدانی بڕی پارەی
              ئەو جەلسانەی وەرمگرتووە لەگەڵ ڕاوێژکار ئاسۆ، ئەوا خۆم بەرپرسیارم و هیچ بڕە
              پارەیەکم بۆ ناگەڕێندرێتەوە لەلایەن ڕێکخراوی زیندووەوە.
            </li>
            <li>
              ٥: ئەگەر لەماوەی (١) یەک مانگ لە بەرواری وەرگرتنی فۆڕمی سەرەتایی جەلسەکان
              وەرنەگرم، پێویستە کارگێڕیی ڕێکخراوی زیندوو ئاگادار بکەم، بە پێچەوانەوە مافی
              بەشداریکردنم لەدەست دەدەم و پێویستە وەسڵی نوێ ببڕم بۆ وەرگرتنی جەلسەی
              ڕاوێژکاریی نوێ.
            </li>
            <li>
              ٦: پابەندم بە وەرگرتنی هەر ڕاهێنان و ڕێنمایی و تەکنیکێک کە لە ڕاوێژکار ئاسۆ
              وەریدەگرم.
            </li>
            <li>٧: بە گشتی لە جەلسەی سێیەمەوە چارەسەر دەدرێت بە خزمەتخواز.</li>
          </ul>
        </div>

        <div class="mt-10 flex justify-between text-black font-medium">
          <div class="w-1/3 text-center flex gap-1">
            <p class="text-sm pb-8 border-dashed">واژۆی خزمەتخوار:</p>
            <p class="text-sm pb-8 h-20 w-20"></p>
          </div>
          <div class="flex flex-col gap-3 w-1/3">
            <div class="w-full text-center flex gap-1">
              <p class="text-sm pb-8 border-dashed">مۆری رێکخراو:</p>

              <p class="text-sm pb-8 border-dashed"></p>
            </div>
            <div class="w-full text-center flex gap-1">
              <p class="text-sm pb-8 border-dashed">واژۆی ڕاوێژکار:</p>
              <p class="text-sm pb-8 border-dashed"></p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="px-5 py-2 mx-5 mb-5 border-2 border-green-600 rounded-lg text-xs text-black"
      >
        <div class="flex flex-col gap-4 justify-start">
          <div class="text-black font-semibold">
            ناونیشان: سلێمانی - شەقامی مامۆستایان - تەلاری ئانیا - نهۆمی دووەم - ئۆفیسی
            ژمارە -٤-
          </div>
          <div class="flex justify-between items-center font-semibold">
            <div>ژ.م: ٠٧٧٣٤٤٥٧٧٨٠ - ٠٧٥٠٣٠٧٢٥٤٠</div>
            <div>
              ئیمەیڵ:
              <span class="text-blue-700">zinduorganization@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- left side of the invoice page -- button side -->
    <div class="ml-6 flex flex-col gap-3">
      <button
        @click="printPdf"
        class="px-4 py-2 bg-sky-600 text-white rounded print-hide"
      >
        Print / Save as PDF
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const invoiceEl = ref<HTMLElement | null>(null);

// Sample data - updated with data from the PDF
const company = {
  title: " ڕێکخراوی زیندوو ",
  sub_title: " بۆ تەندروستی و ژینگە دۆستی ",
};

const invoice = {
  number: "043", //
  date: new Date()
    .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
    .replace(/-/g, "/"), //
  consultant: "ئاسۆکامەران", //
  // Removed dueDate and taxRate as they are not explicitly present/needed for this type of agreement
  items: [
    {
      description: "24 Psychological Consultation Sessions via Chat/Correspondence", // [cite: 7, 10]
      qty: 24, //
      unitPrice: 150000, // 15,000 IQD per session
    },
  ],
};

const client = {
  name: "Kajeh Ahmad Qadir", //
  address: "Sulaymaniyah City", //
  phone: "07734457780", // First number is likely the client's
  email: "N/A (Not provided in form)", // Not in source
};

// Removed warehouse/ship to as it's an agreement for service

const subtotal = computed(() =>
  invoice.items.reduce((s, it) => s + it.qty * it.unitPrice, 0)
);

// Tax calculation removed as no tax rate was specified, and agreement is for a total fee
const total = computed(() => subtotal.value);

// Modified to handle IQD (Iraqi Dinar)
function formatCurrency(v: any, currencyCode: string = "IQD") {
  // Using 'ar-IQ' locale for better formatting of IQD
  return new Intl.NumberFormat("ar-IQ", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(v);
}

function printPdf() {
  if (!invoiceEl.value) {
    return;
  }
  const printContents = invoiceEl.value.innerHTML;
  const originalContents = document.body.innerHTML;
  const originalTitle = document.title;

  document.title = `Agreement-${invoice.number}`;
  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
  document.title = originalTitle;
  window.location.reload(); // To re-initialize Vue app state
}

async function downloadHtmlPdf() {
  // client-side HTML -> PDF using html2pdf.js (you need to install it)
  if (!invoiceEl.value) return;
  // @ts-ignore
  if (typeof html2pdf === "undefined") {
    alert(
      "html2pdf is not loaded. Install it: npm i html2pdf.js or include the CDN script."
    );
    return;
  }

  const opt = {
    margin: [10, 10, 10, 10],
    filename: `Agreement-${invoice.number}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
  };
  // @ts-ignore
  html2pdf().set(opt).from(invoiceEl.value).save();
}

function exportPuppeteer() {
  alert("See server-side Puppeteer example in the component comments (server script).");
}
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  .printable,
  .printable * {
    visibility: visible;
  }
  .printable {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .print-hide {
    display: none;
  }
}
</style>

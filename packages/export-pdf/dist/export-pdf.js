#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const args = process.argv.slice(2);
    let urlArg;
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--url' && args[i + 1]) {
            urlArg = args[i + 1];
            i++;
        }
    }
    if (!urlArg) {
        console.error('ページURL(--url)を指定してください。');
        console.error('例: npx export-pdf --url http://localhost:5173/apple-ecosystem/index.html');
        process.exit(1);
    }
    const targetUrl = urlArg;
    // PDF出力パス生成（pdfディレクトリ直下にURL末尾からファイル名を生成）
    const projectRoot = process.cwd();
    let pdfFileName = path.basename(targetUrl);
    if (pdfFileName.endsWith('.html')) {
        pdfFileName = pdfFileName.replace(/\.html$/, '.pdf');
    }
    else if (pdfFileName === '') {
        // URLが/で終わる場合
        pdfFileName = 'index.pdf';
    }
    else {
        pdfFileName += '.pdf';
    }
    const pdfPath = path.join(projectRoot, 'packages', 'export-pdf', 'pdf', pdfFileName);
    console.log(`PuppeteerでアクセスするURL: ${targetUrl}`);
    console.log(`PDFの出力先: ${pdfPath}`);
    let browser;
    try {
        // PDF出力先ディレクトリ作成
        const pdfDir = path.dirname(pdfPath);
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }
        console.log('Puppeteerを起動');
        browser = yield puppeteer_1.default.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        console.log('ページの作成');
        const page = yield browser.newPage();
        yield page.setDefaultNavigationTimeout(30000); // 30秒
        console.log(`ページの移動: ${targetUrl}`);
        yield page.goto(targetUrl, {
            waitUntil: 'load'
        });
        // 印刷用スタイル
        yield page.emulateMediaType('print');
        // VitePressコンテンツの表示を待つ
        yield page.waitForSelector('.VPContent', { visible: true, timeout: 30000 });
        console.log(`PDFを生成: ${pdfPath}`);
        yield page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
        });
        console.log('PDFの生成が完了');
    }
    catch (error) {
        console.error('PDF生成エラー:', error);
        process.exit(1);
    }
    finally {
        if (browser) {
            console.log('ブラウザを終了');
            yield browser.close();
        }
    }
}))();

window.__ModuleLoader__.load({
	id: "better-basicfun",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;

"use strict";var Te=Object.defineProperty;var It=Object.getOwnPropertyDescriptor;var At=Object.getOwnPropertyNames;var Nt=Object.prototype.hasOwnProperty;var Ht=(e,n,t)=>n in e?Te(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var Pt=(e,n)=>{for(var t in n)Te(e,t,{get:n[t],enumerable:!0})},Ct=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of At(n))!Nt.call(e,r)&&r!==t&&Te(e,r,{get:()=>n[r],enumerable:!(o=It(n,r))||o.enumerable});return e};var Dt=e=>Ct(Te({},"__esModule",{value:!0}),e);var ot=(e,n,t)=>Ht(e,typeof n!="symbol"?n+"":n,t);var Rn={};Pt(Rn,{EffortEditor:()=>Ve,apply:()=>Mn,createEditorApi:()=>He,describeNamespace:()=>me,effortsOf:()=>Xe,inject:()=>kn,inputOf:()=>$e,name:()=>yn,nameOf:()=>Qe,providersOf:()=>ge});module.exports=Dt(Rn);var Ze=require("react-dom/client"),Q=require("react");var U="better-basicfun",rt="/better-basicfun/raw-models",xe="llm-pi-ai",fe="reasoningEffortsUnset",ue="inputUnset",qe=U;var H=require("react");var st=["off","minimal","low","medium","high","xhigh","max"],Ft=["text","image"],Ot=[{id:"deepseek-v4-vision",patterns:["deepseek-v4-flash-vision","deepseek-v4-vision"],efforts:{off:"none",low:"low",high:"high",max:"max"},compat:{thinkingFormat:"deepseek",supportsReasoningEffort:!0},input:["text","image"],contextWindow:1048576,maxTokens:384e3,note:"DeepSeek V4 \u89C6\u89C9\u5B9E\u9A8C\u7248\uFF1A\u5B98\u65B9\u76EE\u5F55\u6807\u6CE8\u56FE\u7247\u8F93\u5165\u3002"},{id:"deepseek-v4",patterns:["deepseek-v4"],efforts:{off:"none",low:"low",high:"high",max:"max"},compat:{thinkingFormat:"deepseek",supportsReasoningEffort:!0},input:["text"],contextWindow:1048576,maxTokens:384e3,note:'DeepSeek V4 \u5B98\u65B9\u679A\u4E3E Low / High / Max\uFF08\u9ED8\u8BA4 High\uFF1Bmedium\u3001xhigh \u517C\u5BB9\u6620\u5C04\u5230 High\uFF09\uFF0COff \u5373 thinking:"disabled"\uFF08Responses API \u4E0B off \u4EE5 effort:"none" \u8868\u793A\uFF09\u3002\u5B98\u65B9\u5BB9\u91CF 1M \u4E0A\u4E0B\u6587 / \u6700\u5927\u8F93\u51FA 384K\uFF1Bvision \u5B9E\u9A8C\u7248\u89C1\u5355\u72EC\u6761\u76EE\u3002'},{id:"deepseek-v3",patterns:["deepseek-v3","deepseek-chat"],efforts:{off:"none",high:"high",max:"max"},compat:{thinkingFormat:"deepseek",supportsReasoningEffort:!0},input:["text"],contextWindow:163840,maxTokens:65536,note:"DeepSeek V3 \u6863\u4F4D\uFF1AOff / High / Max\u3002\u5B98\u65B9\u5DF2\u505C\u552E V3 \u4EE3\uFF08\u5B9A\u4EF7\u9875\u4EC5\u5269 V4 \u4E09\u578B\uFF09\uFF0C\u5BB9\u91CF\u53D6\u76EE\u5F55\u73B0\u5F79\u503C\u3002"},{id:"deepseek-r1",patterns:["deepseek-r1","deepseek-reasoner"],efforts:{high:"high"},compat:{thinkingFormat:"deepseek",supportsReasoningEffort:!0},input:["text"],contextWindow:163840,maxTokens:32768,note:"DeepSeek-R1 \u4E3A\u63A8\u7406\u6A21\u578B\uFF0C\u4EC5\u63D0\u4F9B High\u3002\u5B98\u65B9\u5DF2\u4E0B\u67B6 R1 \u4EE3\uFF0C\u5BB9\u91CF\u53D6\u76EE\u5F55 r1-0528 \u503C\u3002"},{id:"openai-gpt-5-2",patterns:["gpt-5.2"],efforts:{off:"none",low:"low",medium:"medium",high:"high",xhigh:"xhigh"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:4e5,maxTokens:128e3,note:"GPT-5.2 \u6863\u4F4D\uFF1ANone / Low / Medium / High / XHigh\uFF08\u9ED8\u8BA4 None\uFF09\u3002\u5B98\u65B9\u53E6\u652F\u6301 PDF \u8F93\u5165\uFF08\u6838\u5FC3\u8BCD\u8868\u6682\u4E0D\u542B\uFF09\u3002gpt-5.2-pro \u5B98\u65B9\u9875\u672A\u5355\u5217\u6863\u4F4D\u884C\uFF0C\u6309\u672C\u6761\u76EE\u540C\u6863\u5904\u7406\uFF1Bgpt-5.2-codex \u89C1\u5355\u72EC\u6761\u76EE\u3002"},{id:"openai-gpt-5-2-codex",patterns:["gpt-5.2-codex"],efforts:{low:"low",medium:"medium",high:"high",xhigh:"xhigh"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:4e5,maxTokens:128e3,note:"GPT-5.2-Codex \u6863\u4F4D\uFF1ALow / Medium / High / XHigh\uFF08\u65E0 None \u6863\uFF0C\u52FF\u52FE Off\uFF09\uFF0C\u5E26\u56FE\u8F93\u5165\u3001400K\u3002"},{id:"openai-gpt-5-6",patterns:["gpt-5.6"],efforts:{off:"none",low:"low",medium:"medium",high:"high",xhigh:"xhigh",max:"max"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:105e4,maxTokens:128e3,note:"GPT-5.6\uFF08\u522B\u540D\u5373 sol\uFF09\u6863\u4F4D\uFF1ANone / Low / Medium(\u9ED8\u8BA4) / High / XHigh / Max\uFF1Bsol/luna/terra \u540C\u6863\uFF0C\u5E26\u56FE\u8F93\u5165\u3002"},{id:"openai-gpt-5-5",patterns:["gpt-5.5"],efforts:{off:"none",low:"low",medium:"medium",high:"high",xhigh:"xhigh"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:105e4,maxTokens:128e3,note:"GPT-5.5 \u6863\u4F4D\uFF1ANone / Low / Medium(\u9ED8\u8BA4) / High / XHigh\uFF0C\u5E26\u56FE\u8F93\u5165\u3002pro \u53D8\u4F53\u4EC5 Medium / High(\u9ED8\u8BA4) / XHigh \u4E14\u4EC5 Responses API\u3002"},{id:"openai-gpt-5-4",patterns:["gpt-5.4"],efforts:{off:"none",low:"low",medium:"medium",high:"high",xhigh:"xhigh"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:105e4,maxTokens:128e3,note:"GPT-5.4 \u6863\u4F4D\uFF1ANone(\u9ED8\u8BA4) / Low / Medium / High / XHigh\uFF0C\u5E26\u56FE\u8F93\u5165\u3002pro \u53D8\u4F53\u4EC5 Medium/High/XHigh\uFF1Bmini/nano \u4E3A 400K \u4E0A\u4E0B\u6587\u3002"},{id:"openai-gpt-5-3",patterns:["gpt-5.3"],efforts:{low:"low",medium:"medium",high:"high",xhigh:"xhigh"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:4e5,maxTokens:128e3,note:"GPT-5.3-Codex \u6863\u4F4D\uFF1ALow / Medium / High / XHigh\uFF08\u65E0 None \u6863\uFF09\uFF0C\u5E26\u56FE\u8F93\u5165\u3001400K\uFF1Bgpt-5.3-chat \u4E3A\u975E\u63A8\u7406\u804A\u5929\u6A21\u578B\uFF08\u89C1 chat \u6761\u76EE\uFF09\u3002"},{id:"openai-gpt-5-1",patterns:["gpt-5.1"],efforts:{off:"none",low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:4e5,maxTokens:128e3,note:"GPT-5.1 \u6863\u4F4D\uFF1ANone / Low / Medium / High\uFF08\u9ED8\u8BA4 None\uFF09\u3002"},{id:"openai-gpt-5-1-codex",patterns:["gpt-5.1-codex"],efforts:{low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:4e5,maxTokens:128e3,note:"GPT-5.1-Codex \u7CFB\u5217\uFF1A\u5B98\u65B9\u6A21\u578B\u9875\u672A\u5355\u5217 effort \u503C\u57DF\uFF0C\u6309\u540C\u4EE3\u4FDD\u5B88\u6863 Low / Medium / High\uFF08\u65E0 None\uFF1Bxhigh \u672A\u8BC1\u5B9E\uFF09\u3002\u5982\u7AEF\u70B9\u652F\u6301 xhigh/none \u53EF\u624B\u8C03\u3002"},{id:"openai-gpt-5",patterns:["gpt-5"],efforts:{minimal:"minimal",low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:4e5,maxTokens:128e3,note:"GPT-5 \u521D\u4EE3\u6863\u4F4D\uFF1AMinimal / Low / Medium / High\uFF0C\u65E0\u5173\u95ED\u6863\u3002"},{id:"openai-chat",patterns:["gpt-5.1-chat-latest","gpt-5.2-chat-latest","gpt-5.3-chat-latest","gpt-5-chat-latest","gpt-chat-latest","gpt-5-chat","gpt-5.1-chat","gpt-5.2-chat","gpt-5.3-chat"],efforts:!1,input:["text","image"],contextWindow:128e3,maxTokens:16384,note:"-chat \u7CFB\u5217\uFF08\u5B98\u65B9 id \u4E3A gpt-5.x-chat-latest\uFF09\u4E3A\u975E\u63A8\u7406\u804A\u5929\u6A21\u578B\uFF0C\u4E0D\u652F\u6301 effort \u53C2\u6570\uFF08\u52FF\u52FE\u601D\u8003\u6863\uFF09\uFF1B\u5B98\u65B9\u652F\u6301\u56FE\u7247\u8F93\u5165\uFF0C128K / 16,384 \u8F93\u51FA\u3002gpt-5-chat-latest \u5DF2\u4E8E 2026-07-23 \u4E0B\u67B6\u3001gpt-chat-latest \u5DF2\u65E0\u5B98\u65B9\u9875\u9762\uFF08\u4FDD\u7559\u6A21\u5F0F\u4F9B\u7F51\u5173\uFF09\u3002"},{id:"openai-o",patterns:["o1","o3","o4"],efforts:{low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:2e5,maxTokens:1e5,note:"OpenAI o \u7CFB\u6863\u4F4D\uFF1ALow / Medium / High\u3002\u5B98\u65B9\u5DF2\u4E8E 2026-06 \u516C\u544A\u9000\u5F79\uFF08o1/o1-pro/o3-mini/o4-mini 2026-10-23 \u79FB\u9664\u3001o3/o3-pro 2026-12-11\uFF09\uFF0C\u7F51\u5173\u6B8B\u7559\u4ECD\u53EF\u547D\u4E2D\uFF1B\u591A\u6570 o \u7CFB\u7AEF\u70B9\u6536\u56FE\uFF08o3-mini \u4F8B\u5916\uFF09\u3002"},{id:"openai-gpt-oss",patterns:["gpt-oss"],efforts:{low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text"],contextWindow:131072,maxTokens:131072,note:"GPT-OSS \u5F00\u6E90\u6743\u91CD\uFF08Ollama/vLLM \u5E38\u89C1\uFF09\uFF1Areasoning effort Low / Medium / High\uFF08\u5B98\u65B9\u9ED8\u8BA4 Low\uFF09\uFF0C\u7EAF\u6587\u672C\uFF0C131K \u4E0A\u4E0B\u6587 / 131K \u8F93\u51FA\u3002"},{id:"openai-gpt-4o",patterns:["gpt-4o"],efforts:!1,input:["text","image"],contextWindow:128e3,maxTokens:16384,note:"GPT-4o \u4EE3\u9645\uFF1A\u975E\u63A8\u7406\u6A21\u578B\uFF0C\u4E0D\u652F\u6301 effort \u53C2\u6570\uFF08\u52FF\u52FE\u601D\u8003\u6863\uFF09\uFF1B\u56FE\u7247\u8F93\u5165\u5168\u7CFB\u6807\u914D\uFF0C128K / 16,384 \u8F93\u51FA\u3002"},{id:"openai-gpt-4-1",patterns:["gpt-4.1"],efforts:!1,input:["text","image"],contextWindow:1047576,maxTokens:32768,note:"GPT-4.1 \u5168\u7CFB\uFF08\u542B mini/nano\uFF09\uFF1A\u975E\u63A8\u7406\u6A21\u578B\uFF0C\u4E0D\u652F\u6301 effort \u53C2\u6570\uFF1B\u5B98\u65B9 1,047,576 \u4E0A\u4E0B\u6587 / 32,768 \u8F93\u51FA\uFF0C\u5168\u7CFB\u5E26\u56FE\u8F93\u5165\u3002"},{id:"openai-gpt-4-turbo-preview",patterns:["gpt-4-turbo-preview"],efforts:!1,input:["text"],contextWindow:128e3,maxTokens:4096,note:"GPT-4 Turbo Preview\uFF1A\u975E\u63A8\u7406\u6A21\u578B\uFF0C\u7EAF\u6587\u672C\u8F93\u5165\uFF08\u6B63\u5F0F turbo \u5FEB\u7167\u652F\u6301\u56FE\u7247\uFF0C\u89C1\u4E0B\u6761\uFF09\uFF0C128K\u3002"},{id:"openai-gpt-4-turbo",patterns:["gpt-4-turbo"],efforts:!1,input:["text","image"],contextWindow:128e3,maxTokens:4096,note:"GPT-4 Turbo\uFF1A\u975E\u63A8\u7406\u6A21\u578B\uFF0C\u5B98\u65B9\u652F\u6301\u56FE\u7247\u8F93\u5165\uFF0C128K / 4,096 \u8F93\u51FA\u3002"},{id:"openai-gpt",patterns:["gpt-4","gpt-3.5"],efforts:!1,input:["text"],note:"GPT-4/3.5 \u4EE3\u9645\uFF1A\u975E\u63A8\u7406\u6A21\u578B\uFF0C\u4E0D\u652F\u6301 effort \u53C2\u6570\uFF08\u52FF\u52FE\u601D\u8003\u6863\uFF09\u3002gpt-4-turbo/4.1 \u8D77\u652F\u6301\u56FE\u7247\uFF0C\u89C1\u5355\u72EC\u6761\u76EE\uFF1B\u65B0\u4EE3\u8BF7\u7528 GPT-5 \u7CFB\uFF08\u89C1 openai-chat/gpt-5.x \u6761\u76EE\uFF09\u3002"},{id:"anthropic-claude-5",patterns:["claude-fable-5","claude-mythos-5","claude-opus-5","claude-sonnet-5"],efforts:{low:"low",medium:"medium",high:"high",xhigh:"xhigh",max:"max"},compat:{supportsReasoningEffort:!0},anthropicAdaptive:!0,input:["text","image"],contextWindow:1e6,maxTokens:128e3,note:"Claude 5 \u4EE3\u6863\u4F4D\uFF1ALow / Medium / High / XHigh / Max\uFF08\u9ED8\u8BA4 High\uFF09\uFF1BMythos Preview \u4EC5\u81F3 Max\uFF08\u89C1\u5355\u72EC\u6761\u76EE\uFF09\u3002\u5B98\u65B9\u652F\u6301 PDF \u8F93\u5165\u3002\u6CE8\u610F\uFF1AAnthropic \u5B98\u65B9 OpenAI \u517C\u5BB9\u5C42\u4F1A\u5FFD\u7565 effort \u53C2\u6570\uFF0C\u58F0\u660E\u5728\u7B2C\u4E09\u65B9\u7F51\u5173\u6620\u5C04\u65F6\u751F\u6548\u3002"},{id:"anthropic-claude-mythos-preview",patterns:["claude-mythos-preview"],efforts:{low:"low",medium:"medium",high:"high",max:"max"},compat:{supportsReasoningEffort:!0},anthropicAdaptive:!0,input:["text","image"],contextWindow:1e6,maxTokens:128e3,note:"Claude Mythos Preview\uFF1A\u5B98\u65B9\u6863\u4F4D Low / Medium / High / Max\uFF08\u65E0 XHigh\uFF09\uFF0C1M \u4E0A\u4E0B\u6587\u3002"},{id:"anthropic-claude-opus-4-high",patterns:["claude-opus-4-8","claude-opus-4-7"],efforts:{low:"low",medium:"medium",high:"high",xhigh:"xhigh",max:"max"},compat:{supportsReasoningEffort:!0},anthropicAdaptive:!0,input:["text","image"],contextWindow:1e6,maxTokens:128e3,note:"Claude Opus 4.7/4.8 \u6863\u4F4D\uFF1ALow / Medium / High(\u9ED8\u8BA4) / XHigh / Max\uFF1Bxhigh \u4E3A\u5B98\u65B9\u63A8\u8350\u7684\u7F16\u7801\u8D77\u6B65\u6863\u30021M \u4E0A\u4E0B\u6587\u3002"},{id:"anthropic-claude-4-6",patterns:["claude-opus-4-6","claude-sonnet-4-6"],efforts:{low:"low",medium:"medium",high:"high",max:"max"},compat:{supportsReasoningEffort:!0},anthropicAdaptive:!0,input:["text","image"],contextWindow:1e6,maxTokens:128e3,note:"Claude 4.6 \u4EE3\u6863\u4F4D\uFF1ALow / Medium / High / Max\uFF08\u65E0 XHigh\u2014\u2014\u5B98\u65B9\u660E\u8A00\u300C\u652F\u6301 max \u7684\u90E8\u5206\u578B\u53F7\u4E0D\u652F\u6301 xhigh\u300D\uFF09\u30021M \u4E0A\u4E0B\u6587\u3002"},{id:"anthropic-claude-opus-4-5",patterns:["claude-opus-4-5"],efforts:{low:"low",medium:"medium",high:"high"},compat:{supportsReasoningEffort:!0},input:["text","image"],contextWindow:2e5,maxTokens:64e3,note:"Claude Opus 4.5\uFF1A\u5B98\u65B9 effort \u652F\u6301\u5217\u8868\uFF0820251101 \u5FEB\u7167\uFF09\uFF0C\u6863\u4F4D Low / Medium / High\uFF08\u65E0 XHigh/Max\uFF09\uFF0C\u53EF\u4E0E budget_tokens \u5E76\u7528\uFF1B200K / 64K\u3002"},{id:"anthropic-claude",patterns:["claude"],efforts:!1,input:["text","image"],contextWindow:2e5,maxTokens:64e3,note:"Claude 3.x \u4E0E Sonnet 4.5 / Haiku 4.5\uFF1A\u5B98\u65B9 effort \u53C2\u6570\u4E0D\u652F\u6301\uFF08\u4EC5 Fable/Mythos 5\u3001Opus 5/4.6-4.8\u3001Sonnet 5/4.6\u3001Opus 4.5 \u652F\u6301\uFF09\uFF0C\u601D\u8003\u7531 thinking.type \u63A7\u5236\u2014\u2014\u52FF\u52FE\u601D\u8003\u6863\u3002\u53C2\u8003\u5BB9\u91CF 200K / 64K\uFF08Haiku 3.5 \u4E3A\u7EAF\u6587\u672C\uFF0C\u6309\u9700\u53D6\u6D88\u56FE\u7247\uFF09\u3002"},{id:"google-gemini",patterns:["gemini"],efforts:{low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:1048576,maxTokens:65536,note:"Gemini \u901A\u7528\u5B89\u5168\u6863\uFF1ALow / Medium / High\uFF08\u5B98\u65B9 OpenAI \u517C\u5BB9\u6620\u5C04\u8868\u53E6\u6536 minimal\uFF1A2.5 \u7CFB\u6620\u5C04\u4E3A 1,024 \u9884\u7B97\u30013.1 Flash-Lite/3 Flash \u539F\u751F minimal\u30013.1 Pro \u843D low\uFF09\u3002none \u4EC5\u80FD\u5173 2.5 \u975E Pro\uFF1B2.5 Pro \u4E0E 3 \u4EE3\u4E0D\u53EF\u5173\uFF1B\u5404\u578B\u9ED8\u8BA4\u4E0D\u4E00\uFF08flash-lite \u9ED8\u8BA4\u5173\uFF09\u3002\u5B98\u65B9\u53E6\u6536\u97F3\u9891/\u89C6\u9891/PDF\u3002"},{id:"xai-grok-high",patterns:["grok-4.6"],efforts:{low:"low",medium:"medium",high:"high",xhigh:"xhigh"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:5e5,note:"Grok 4.6 \u6863\u4F4D\uFF1ALow / Medium / High(\u9ED8\u8BA4) / XHigh\uFF0C\u601D\u8003\u4E0D\u53EF\u5173\u95ED\uFF1B\u5E26\u56FE\u8F93\u5165\u3001500K \u4E0A\u4E0B\u6587\u3002grok-4.7 \u4E0D\u5B58\u5728\uFF08\u5B98\u65B9 404 \u5DF2\u6838\uFF09\uFF0C\u5DF2\u9664\u540D\u3002"},{id:"xai-grok-4-5",patterns:["grok-4.5"],efforts:{low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:5e5,note:"Grok 4.5 \u6863\u4F4D\uFF1ALow / Medium / High(\u9ED8\u8BA4)\uFF0C\u601D\u8003\u4E0D\u53EF\u5173\u95ED\uFF1B\u5E26\u56FE\u8F93\u5165\u3002\u4F20\u5165 xhigh \u4F1A\u88AB\u5B98\u65B9\u9759\u9ED8\u6309 High \u5904\u7406\u3002"},{id:"xai-grok-4-3",patterns:["grok-4.3"],efforts:{off:"none",low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:1e6,note:"Grok 4.3\uFF1A\u5B98\u65B9\u56DB\u7EA7 reasoning effort\uFF08None / Low / Medium / High\uFF09\uFF0C1M \u4E0A\u4E0B\u6587\u3001\u5E26\u56FE\u8F93\u5165\uFF1Bgrok-4-fast \u7B49\u65E7 slug 2026-05-15 \u8D77\u81EA\u52A8\u91CD\u5B9A\u5411\u5230\u672C\u578B\u53F7\u3002"},{id:"xai-grok",patterns:["grok"],efforts:{low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text"],note:"Grok \u901A\u7528\u6863\u4F4D\uFF1ALow / Medium / High\u3002\u521D\u4EE3 grok-4\u3001grok-4.20 \u4E0E grok-build-0.1 \u4E0D\u63A5\u53D7\u8BE5\u53C2\u6570\uFF08grok-4 \u7CFB\u4E0E grok-3 \u5DF2\u4E8E 2026-05-15 \u9000\u5F79\u5E76\u91CD\u5B9A\u5411\u81F3 4.3\uFF09\uFF1Bgrok-4.20-multi-agent \u7684\u56DB\u6863\u63A7\u5236\u7684\u662F agent \u6570\u91CF\u800C\u975E\u601D\u8003\u6DF1\u5EA6\u3002\u65B0\u65E7\u4EE3\u9645\u8BF7\u4F18\u5148\u9009 4.5/4.6/4.3\uFF1B\u591A\u6A21\u6001\u53D8\u4F53\u6309\u9700\u52FE\u9009\u56FE\u7247\u3002"},{id:"mistral-magistral",patterns:["magistral"],efforts:!1,input:["text"],contextWindow:32768,maxTokens:32768,note:"Magistral \u539F\u751F\u601D\u8003\u7EBF\uFF08\u65E0 effort \u53C2\u6570\uFF0C\u4E3A prompt_mode \u8BED\u4E49\uFF09\uFF0C\u5B98\u65B9\u5DF2\u4E8E 2026-07-28 \u58F0\u660E\u5F03\u7528\u3001\u9010\u6B65\u64A4\u51FA\uFF1B\u73B0\u5F79\u63A8\u7406\u8D70 mistral-small-2603 / mistral-medium-3-5 \u7684 reasoning_effort\uFF08\u89C1\u4E0B\u6761\uFF09\u3002"},{id:"mistral-medium-3",patterns:["mistral-medium-3.5","mistral-small-latest","mistral-small-2603"],efforts:{off:"none",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],note:"Mistral \u73B0\u5F79\u63A8\u7406\u6863\uFF1ANone / High\u2014\u2014\u5B98\u65B9 reasoning_effort \u679A\u4E3E\uFF08mistral-common \u534F\u8BAE\u5E93\uFF09\u5373 none/high\uFF1Bmistral-small-2603\uFF08Small 4\uFF09\u4E0E mistral-medium-3-5 \u7ECF\u5B83\u63A7\u5236\uFF0CMedium 3.5 \u5E26\u89C6\u89C9\u3002\u5BB9\u91CF\u672A\u5728\u5B98\u65B9\u76EE\u5F55\u9875\u5355\u5217\uFF0C\u4E0D\u63D0\u4F9B\u3002"},{id:"qwen-vision",patterns:["qwen-vl","qwen2-vl","qwen2-5-vl","qwen3-vl","qvq"],efforts:{off:null,high:"high"},compat:{thinkingFormat:"qwen"},input:["text","image"],contextWindow:131072,maxTokens:8192,note:"\u901A\u4E49\u89C6\u89C9\u7EBF\uFF08Qwen-VL/QvQ\uFF09\uFF1Aenable_thinking \u5F00\u5173\uFF08\u5F00=High\uFF09\uFF0C\u6536\u56FE\u3002qwen3-vl \u5BB9\u91CF\u66F4\u5927\uFF0C\u6309\u9700\u4E0A\u8C03\u3002"},{id:"qwen-3-8",patterns:["qwen3.8"],efforts:{off:null,low:"low",medium:"medium",xhigh:"xhigh"},compat:{thinkingFormat:"qwen",supportsReasoningEffort:!0},input:["text","image"],contextWindow:1e6,note:"Qwen 3.8 \u7CFB\uFF1A\u5B98\u65B9 reasoning_effort \u6863\u4F4D XHigh(\u9ED8\u8BA4) / Medium / Low\uFF0Cthinking \u9ED8\u8BA4\u5F00\u3001\u53EF\u6309\u8BF7\u6C42\u5173\u95ED\uFF1B\u539F\u751F\u591A\u6A21\u6001\uFF08qwen3.8-max \u56FE\u50CF/\u89C6\u9891\u7406\u89E3\uFF0C\u89C6\u9891\u672A\u5165\u6838\u5FC3\u8BCD\u8868\uFF09\u30021M \u6863\u4E0A\u4E0B\u6587\u300227B \u4E0E Flash-Next \u5F00\u6E90\u6B3E\u89C1\u5355\u72EC\u6761\u76EE\u3002"},{id:"qwen-3-8-27b",patterns:["qwen3.8-27b"],efforts:{off:null,low:"low",medium:"medium",xhigh:"xhigh"},compat:{thinkingFormat:"qwen",supportsReasoningEffort:!0},input:["text","image"],contextWindow:262144,note:"Qwen3.8-27B\uFF08dense\uFF0C2026-08-14 \u5F00\u6E90\uFF09\uFF1A\u5B98\u65B9 reasoning_effort \u6863\u4F4D XHigh(\u9ED8\u8BA4) / Medium / Low\uFF0Cthinking \u9ED8\u8BA4\u5F00\u3001\u53EF\u6309\u8BF7\u6C42\u5173\uFF1B\u539F\u751F\u56FE\u50CF+\u89C6\u9891\u7406\u89E3\uFF08\u89C6\u9891\u672A\u5165\u6838\u5FC3\u8BCD\u8868\uFF09\u3002262,144 \u539F\u751F\u4E0A\u4E0B\u6587\u3001\u5B98\u65B9\u58F0\u660E\u53EF\u6269\u81F3 1M\u3002\u6765\u6E90\uFF1AHF Qwen/Qwen3.8-27B \u6A21\u578B\u5361\u3002"},{id:"qwen-3-8-flash-next",patterns:["qwen3.8-flash-next"],efforts:{off:null,low:"low",medium:"medium",xhigh:"xhigh"},compat:{thinkingFormat:"qwen",supportsReasoningEffort:!0},input:["text","image"],contextWindow:262144,note:"Qwen3.8-Flash-Next\uFF08125B-A6B \u5B9E\u9A8C\u67B6\u6784\uFF0CQwen4 \u524D\u8EAB\uFF09\uFF1A\u5B98\u65B9 reasoning_effort \u6863\u4F4D XHigh(\u9ED8\u8BA4) / Medium / Low + enable_thinking \u5F00\u5173\uFF1B\u539F\u751F\u89C6\u89C9\uFF08Vision Encoder\uFF09\u3002262,144 \u539F\u751F\u4E0A\u4E0B\u6587\u3001\u53EF\u6269\u81F3 1M\u3002\u6765\u6E90\uFF1AHF \u6A21\u578B\u5361\u4E0E qwen.ai \u5B98\u65B9\u535A\u5BA2\u3002"},{id:"qwen",patterns:["qwen","qwq"],efforts:{off:null,high:"high"},compat:{thinkingFormat:"qwen"},input:["text"],contextWindow:1e6,maxTokens:65536,note:"\u901A\u4E49\u5343\u95EE\uFF1Aenable_thinking \u5F00\u5173\uFF08\u65E0 effort \u6863\uFF09\uFF0C\u5F00=High\uFF1B\u73B0\u5F79\u65D7\u8230\u4E3A qwen3.8 \u7CFB\uFF081M \u6863\u4E0A\u4E0B\u6587\uFF0C\u89C1 qwen-3-8 \u6761\u76EE\uFF09\u30023.6/3.7 \u4EE3\u7684 Plus/Flash \u4EA6\u9ED8\u8BA4\u591A\u6A21\u6001\uFF08\u56FE\u7247/\u89C6\u9891\uFF09\uFF0C\u5982\u63A5\u5165\u8BF7\u6309\u9700\u52FE\u9009\u56FE\u7247\uFF1B\u89C6\u89C9\u7EBF\u89C1 qwen-vision \u6761\u76EE\u3002"},{id:"glm-vision",patterns:["glm-4v","glm-4-6v","glm-4-5v","glm-5v"],efforts:{off:null,high:"high"},compat:{thinkingFormat:"zai"},input:["text","image"],contextWindow:131072,maxTokens:32768,note:"\u667A\u8C31\u89C6\u89C9\u7EBF\uFF08GLM-4V/4.5V/4.6V/5V\uFF09\uFF1Athinking \u5F00\u5173\uFF08\u5F00=High\uFF09\uFF0C\u6536\u56FE\u3002GLM-4.5V \u4E3A\u5F3A\u5236\u601D\u8003\uFF08\u4F20 disabled \u62A5\u9519\uFF0C\u8BF7\u624B\u52A8\u5220 Off \u6863\uFF09\u3002"},{id:"glm-5-3-flash",patterns:["glm-5.3-flash"],efforts:{low:"low",high:"high",max:"max"},compat:{thinkingFormat:"zai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:1048576,maxTokens:131072,note:"GLM-5.3-Flash\uFF08320B\uFF0C\u5B98\u65B9\u6587\u6863 vlm \u5206\u7C7B\uFF09\uFF1A\u5F3A\u5236\u601D\u8003\uFF08thinking.type \u4EC5 enabled\uFF0C\u4E0D\u652F\u6301\u5173\u95ED\uFF09\uFF0C\u6587\u672C\u53C2\u6570\u4E0E GLM-5.3 \u4E00\u81F4\u2014\u2014\u6863\u4F4D Low / High / Max\u3002\u8F93\u5165\u6A21\u6001\uFF1A\u89C6\u9891\u3001\u56FE\u50CF\u3001\u6587\u672C\u3001\u6587\u4EF6\uFF08\u89C6\u9891/\u6587\u4EF6\u672A\u5165\u6838\u5FC3\u8BCD\u8868\uFF0C\u56FE\u7247\u53EF\u52FE\uFF09\u3002\u5B98\u65B9 1M \u4E0A\u4E0B\u6587 / 128K \u6700\u5927\u8F93\u51FA\u3002\u6765\u6E90\uFF1Adocs.bigmodel.cn \u6A21\u578B\u9875\u3002"},{id:"glm-5-3",patterns:["glm-5.3"],efforts:{low:"low",high:"high",max:"max"},compat:{thinkingFormat:"zai",supportsReasoningEffort:!0},input:["text"],contextWindow:1048576,maxTokens:131072,note:"GLM-5.3 \u6863\u4F4D\uFF1ALow / High / Max\uFF08\u5F3A\u5236\u601D\u8003\uFF0C\u5176\u4F59\u503C\u62A5\u9519\uFF09\u3002\u5B98\u65B9\u5BB9\u91CF 1M / 128K\u3002"},{id:"glm-5-2",patterns:["glm-5.2"],efforts:{off:"none",minimal:"minimal",low:"low",medium:"medium",high:"high",xhigh:"xhigh",max:"max"},compat:{thinkingFormat:"zai",supportsReasoningEffort:!0},input:["text"],contextWindow:1048576,maxTokens:131072,note:"GLM-5.2 \u6863\u4F4D\uFF1ANone / Minimal / Low / Medium / High / XHigh / Max\uFF08\u5B98\u65B9\u6620\u5C04\uFF1ALow\xB7Medium\u2192High\u3001XHigh\u2192Max\u3001None\xB7Minimal=\u505C\u6B62\u601D\u8003\uFF09\u3002\u89C6\u89C9\u7EBF\u89C1 glm-vision \u6761\u76EE\u3002"},{id:"glm",patterns:["glm","zhipu","chatglm"],efforts:{off:null,high:"high"},compat:{thinkingFormat:"zai"},input:["text"],note:"GLM \u901A\u7528\uFF1Athinking \u5F00\u5173\uFF08\u65E0 effort \u6863\uFF09\uFF0C\u5F00=High\uFF1Beffort \u9636\u68AF\u4EC5 GLM-5.2+ \u652F\u6301\uFF08\u89C1\u4E0A\u4E24\u6761\u76EE\uFF09\u3002\u6CE8\u610F GLM-4.7/GLM-4.5V \u4E3A\u5F3A\u5236\u601D\u8003\uFF0C\u4F20 disabled \u4F1A\u62A5\u9519\uFF08\u8BF7\u624B\u52A8\u5220 Off \u6863\uFF09\u3002\u89C6\u89C9\u7EBF\u89C1 glm-vision \u6761\u76EE\u3002"},{id:"kimi-k3",patterns:["kimi-k3"],efforts:{low:"low",high:"high",max:"max"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:1048576,note:"Kimi K3 \u6863\u4F4D\uFF1ALow / High / Max(\u9ED8\u8BA4 Max)\uFF0C\u8D70\u9876\u5C42 reasoning_effort\uFF1B\u59CB\u7EC8\u63A8\u7406\u3001\u52FF\u4F20 thinking \u5BF9\u8C61\u3002\u539F\u751F\u89C6\u89C9\u7406\u89E3\uFF0C1M \u4E0A\u4E0B\u6587\uFF08\u6700\u5927\u8F93\u51FA\u5B98\u65B9\u672A\u5355\u72EC\u5217\uFF0C\u4E0D\u63D0\u4F9B\uFF09\u3002"},{id:"kimi-k2-vision",patterns:["kimi-k2.6","kimi-k2.5"],efforts:{off:null,high:"high"},compat:{thinkingFormat:"deepseek"},input:["text","image"],contextWindow:262144,note:"Kimi K2.5/K2.6 \u89C6\u89C9\u4EE3\uFF1Athinking.type \u5F00\u5173\uFF08\u9ED8\u8BA4\u5F00\u3001\u53EF\u5173\uFF09\uFF0C\u5F00=High\uFF1B\u5E26\u89C6\u89C9\uFF0C256K\u3002K2.7 Code \u59CB\u7EC8\u601D\u8003\uFF0C\u89C1\u5355\u72EC\u6761\u76EE\u3002"},{id:"kimi-k27-code",patterns:["kimi-k2.7"],efforts:{high:"high"},compat:{thinkingFormat:"deepseek"},input:["text","image"],contextWindow:262144,note:"Kimi K2.7 Code\uFF08\u542B\u9AD8\u901F\u7248\uFF09\uFF1A\u59CB\u7EC8\u601D\u8003\u2014\u2014thinking.type \u4EC5\u63A5\u53D7 enabled\uFF08\u4F20 disabled \u62A5\u9519\uFF09\uFF0C\u65E0 Off \u6863\uFF1B\u5E26\u89C6\u89C9\uFF0C256K\u3002"},{id:"kimi-moonshot-v1-vision",patterns:["moonshot-v1-8k-vision","moonshot-v1-32k-vision","moonshot-v1-128k-vision"],efforts:!1,input:["text","image"],note:"Moonshot V1 \u89C6\u89C9\u65E7\u4EE3\uFF088k/32k/128k \u5404\u4E00\uFF09\uFF1A\u65E0\u601D\u8003\u63A7\u4EF6\uFF08\u751F\u6210\u6A21\u578B\uFF09\u3001\u652F\u6301\u56FE\u7247\u8F93\u5165\uFF1B\u8BE5\u7EBF\u5DF2\u505C\u6B62\u5BF9\u65B0\u7528\u6237\u5F00\u653E\uFF082026-08-31 \u5168\u91CF\u4E0B\u7EBF\uFF0C\u7F51\u5173\u6B8B\u7559\u4ECD\u53EF\u547D\u4E2D\uFF09\u3002"},{id:"kimi",patterns:["kimi","moonshot"],efforts:{off:null,high:"high"},compat:{thinkingFormat:"deepseek"},input:["text"],contextWindow:262144,note:"Kimi \u901A\u7528\uFF1Athinking \u5F00\u5173\uFF08\u65E0 effort \u6863\uFF09\uFF0C\u5F00=High\u3002k2 \u7CFB\u5217 2026-05-25 \u4E0B\u7EBF\u3001kimi-latest 2026-01-28 \u4E0B\u7EBF\u3001moonshot-v1 \u7CFB 2026-08-31 \u5168\u91CF\u4E0B\u7EBF\uFF08\u7F51\u5173\u6B8B\u7559\u4ECD\u53EF\u547D\u4E2D\uFF1Bmoonshot-v1 \u672C\u8EAB\u975E\u601D\u8003\u6A21\u578B\uFF09\u3002\u89C6\u89C9\u4EE3\u4E0E K2.7 Code \u89C1\u5355\u72EC\u6761\u76EE\u3002"},{id:"hunyuan-hy3",patterns:["hy3"],efforts:{low:"low",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text"],contextWindow:262144,note:"\u6DF7\u5143 hy3\uFF1A\u5F00\u6E90\u5951\u7EA6\u7ECF chat_template_kwargs.reasoning_effort = no_think(\u9ED8\u8BA4)/low/high\uFF1B\u5B98\u65B9\u6A21\u578B\u5361 256K \u4E0A\u4E0B\u6587\uFF08295B MoE\uFF0C2026 \u5F00\u6E90\uFF09\u3002"},{id:"hunyuan-hy4",patterns:["hy4-preview","hy-4-preview"],efforts:{off:"no_think",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},contextWindow:1e6,note:"\u6DF7\u5143 Hy4 preview\uFF1A\u5B98\u65B9 README\u2014\u2014reasoning \u9ED8\u8BA4 high\uFF08\u6DF1\u5EA6\u601D\u8003\uFF09\uFF0C\u5173\u95ED\u7ECF chat_template_kwargs.reasoning_effort=no_think\uFF1B\u5B98\u65B9\u89C4\u683C\u8868 1M \u4E0A\u4E0B\u6587\uFF08770B-A49B MoE\uFF0CGated DSA\uFF09\u3002low \u6863\u5B98\u65B9\u672A\u5217\uFF0C\u5982\u6709\u8BF7\u624B\u8C03\uFF1B\u89C6\u89C9\u672A\u58F0\u660E\uFF0C\u6309\u9700\u624B\u52FE\u3002\u6765\u6E90\uFF1ATencent-Hunyuan/Hy4-preview \u5B98\u65B9 README\u3002"},{id:"step-3-7",patterns:["step-3.7","step-3.6"],efforts:{low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],contextWindow:262144,note:"\u9636\u8DC3 Step-3.6/3.7 \u6863\u4F4D\uFF1ALow / Medium(\u9ED8\u8BA4\u63A8\u8350) / High\uFF0C\u539F\u751F\u56FE\u7247+\u89C6\u9891\u7406\u89E3\u3002\u4E0A\u4E0B\u6587\u4E3A\u8F93\u5165+\u8F93\u51FA\u603B\u548C\u4E0A\u9650\u3002"},{id:"step-3-5",patterns:["step-3.5"],efforts:{low:"low",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text"],contextWindow:262144,note:"\u9636\u8DC3 Step-3.5 Flash \u6863\u4F4D\uFF1ALow / High\uFF08\u7EAF\u6587\u672C\u63A8\u7406\u65D7\u8230\uFF09\u3002\u4E0A\u4E0B\u6587\u4E3A\u8F93\u5165+\u8F93\u51FA\u603B\u548C\u4E0A\u9650\u3002"},{id:"step",patterns:["step-3","step-2"],efforts:{low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text"],note:"\u9636\u8DC3 Step \u6863\u4F4D\uFF1ALow / Medium / High\uFF08\u9ED8\u8BA4 Medium\uFF0C\u4E0D\u53EF\u5173\u95ED\uFF09\u30023.6/3.7 \u89C6\u89C9\u4EE3\u89C1\u5355\u72EC\u6761\u76EE\u3002"},{id:"doubao",patterns:["doubao","seed"],efforts:{off:null,low:"low",medium:"medium",high:"high"},compat:{thinkingFormat:"openai",supportsReasoningEffort:!0},input:["text","image"],note:"\u8C46\u5305\u6863\u4F4D\uFF1AOff / Low / Medium / High\u2014\u2014effort \u9636\u68AF\u4ECD\u662F\u793E\u533A\u8BC1\u636E\u3001\u5B98\u65B9 Ark \u6587\u6863\u660E\u5217\u7684\u4E3A thinking.type \u5F00\u5173\uFF082026-08-24 \u590D\u6838\u4ECD\u672A\u89C1\u5230 effort \u5B98\u65B9\u660E\u6587\uFF09\u3002seed \u4EE3\u6536\u56FE\uFF081.5-pro \u4F8B\u5916\uFF09\u3002"},{id:"minimax-m3",patterns:["minimax-m3"],efforts:{off:null,high:"high"},compat:{thinkingFormat:"deepseek"},input:["text","image"],contextWindow:1048576,note:"MiniMax-M3\uFF1A\u5B98\u65B9 thinking \u53C2\u6570 enabled/adaptive/disabled\uFF08\u65E0 effort \u6863\uFF09\uFF0C\u5F00=High\u3001\u5173=disabled\uFF1B\u539F\u751F\u591A\u6A21\u6001\uFF08\u56FE/\u89C6\u9891\uFF0C\u6838\u5FC3\u8BCD\u8868\u4EC5\u542B\u56FE\uFF09\uFF0C1M \u4E0A\u4E0B\u6587\u3002"},{id:"baidu-ernie",patterns:["ernie"],efforts:!1,input:["text"],contextWindow:131072,note:"\u767E\u5EA6\u5343\u5E06 ERNIE \u7CFB\uFF1A\u5B98\u65B9 OpenAI \u517C\u5BB9\u63A5\u53E3\u65E0 reasoning_effort \u53C2\u6570\u2014\u2014\u601D\u8003\u7531\u6A21\u578B\u53D8\u4F53\u51B3\u5B9A\uFF08-Thinking \u7CFB\u5217\u59CB\u7EC8\u601D\u8003\u3001\u666E\u901A\u7CFB\u5217\u4E0D\u601D\u8003\uFF09\uFF0C\u52FF\u52FE\u601D\u8003\u6863\u3002ERNIE 4.5 Turbo VL \u652F\u6301\u56FE\u7247\uFF0C\u6309\u9700\u624B\u52FE\uFF1B\u53C2\u8003\u5BB9\u91CF\u53D6 Turbo 128K \u6863\u3002"}],Be={off:null,low:"low",medium:"medium",high:"high"},Wt={"openai-completions":Be,"openai-responses":Be,"anthropic-messages":Be,deepseek:{off:"none",low:"low",high:"high",max:"max"}},Kt={low:"low",medium:"medium",high:"high"};function Ue(e){return(e??"").toLowerCase().trim()}function it(e){return e!==void 0&&/[a-z0-9]/.test(e)}function we(e){return e.toLowerCase().trim().replace(/[^a-z0-9]+/g," ")}function at(e,n,t){let o=n===0?void 0:e[n-1],r=e[n+t];return!it(o)&&!it(r)}function zt(e,n){let t=we(e)+" "+we(n??""),o;for(let r of Ot)for(let d of r.patterns){let s=we(d),l=t.indexOf(s);for(;l>=0;){if(at(t,l,s.length)){(o===void 0||s.length>o.length)&&(o={entry:r,length:s.length});break}l=t.indexOf(s,l+1)}}return o?.entry}var qt={"deepseek.com":"deepseek","anthropic.com":"anthropic-messages"};function Bt(e){let n=Ue(e.api);if(n.length>0)return n;let t=e.baseURL;if(t!==void 0&&t.length>0)try{let r=new URL(t).hostname.toLowerCase().split(".");if(r.length>=2){let d=qt[r.slice(-2).join(".")];if(d!==void 0)return d}}catch{}return"openai-completions"}var dt="openai-completions",Ut="anthropic-messages";function Gt(e,n){let t=Ue(n.api);if(t===dt)return e.compat;if(t===Ut&&e.anthropicAdaptive===!0)return{forceAdaptiveThinking:!0}}var Vt={off:null,low:"low",medium:"medium",high:"high"},jt=["vl","vision","omni","4o","pixtral","internvl"];function Xt(e){let n=we(e);for(let t of jt){let o=we(t),r=n.indexOf(o);for(;r>=0;){if(at(n,r,o.length))return["text","image"];r=n.indexOf(o,r+1)}}}function $t(e){if(e===void 0)return;let n=e.map(t=>t.toLowerCase());if(n.some(t=>Ft.includes(t)))return n.includes("image")?["text","image"]:["text"]}function Ie(e,n,t){let o=zt(e,n.displayName),r,d,s,l;o?.input!==void 0&&(r=o.input,d="knowledge"),o?.contextWindow!==void 0&&(s=o.contextWindow),o?.maxTokens!==void 0&&(l=o.maxTokens);let h=$t(t?.input);if(h!==void 0&&(r=h,d="endpoint"),t?.contextLength!==void 0&&Number.isFinite(t.contextLength)&&t.contextLength>0&&(s=t.contextLength),r===void 0){let x=Xt(e);x!==void 0&&(r=x,d="heuristic")}let k={...r===void 0?{}:{input:r},...d===void 0?{}:{inputSource:d},...s===void 0?{}:{contextWindow:s},...l===void 0?{}:{maxTokens:l}},f=t===void 0?{}:{endpoint:{reasoning:t.reasoning,source:t.source}};if(t?.reasoning===!1)return{efforts:!1,matched:!1,source:"endpoint:"+(t.source??"listing"),confidence:"high",...f,...k};if(o!==void 0){let x=Gt(o,n);return{efforts:o.efforts,...x===void 0?{}:{compat:x},matched:!0,entryId:o.id,source:o.id,confidence:"high",...f,...k}}let p=Bt(n),a=Wt[p]??Kt,g=Ue(n.api)===dt?{thinkingFormat:"openai",supportsReasoningEffort:!0}:void 0;return t?.reasoning===!0?{efforts:{...Vt},...g===void 0?{}:{compat:g},matched:!1,source:"endpoint:"+(t.source??"listing"),confidence:"medium",...f,...k}:{efforts:a,...g===void 0?{}:{compat:g},matched:!1,source:"protocol:"+p,confidence:"low",...f,...k}}var ce=st;function ye(e){let n={};for(let t of ce){if(e===void 0){n[t]={on:!1,wire:""};continue}if(e===!1){n[t]=t==="off"?{on:!0,wire:""}:{on:!1,wire:""};continue}let o=e[t];n[t]={on:o!==void 0,wire:o===null?"":typeof o=="string"?o:""}}return n}function Ge(e){let n=!1,t=!1,o={};for(let r of ce){let d=e[r];if(!d.on)continue;if(r==="off"){n=!0;let l=d.wire.trim();o.off=l.length===0?null:l;continue}t=!0;let s=d.wire.trim();o[r]=s.length===0?r:s}return t?o:n?!1:void 0}function ke(e,n){if(e===n)return!0;if(e===!1||e===void 0||n===!1||n===void 0)return!1;let t=ce.filter(r=>e[r]!==void 0),o=ce.filter(r=>n[r]!==void 0);return t.length!==o.length?!1:t.every(r=>e[r]===n[r])}var R=require("react/jsx-runtime"),lt=new Intl.NumberFormat("en-US");function Ae(e){return e===void 0||e.length===0?{declared:!1,image:!1}:{declared:!0,image:e.includes("image")}}function Qt(e){return e.declared?e.image?["text","image"]:["text"]:null}function ft(e,n){return e.declared?n===void 0?!1:e.image?n.includes("image"):!n.includes("image"):n===void 0}function Ve({route:e,routeDisplayName:n,routeApi:t,routeBaseURL:o,modelId:r,modelName:d,efforts:s,input:l,index:h,staged:k=!1,api:f,readOnly:p,t:a}){let[g,x]=(0,H.useState)(()=>ye(s)),[v,M]=(0,H.useState)(()=>Ae(l)),[T,c]=(0,H.useState)(!1),[y,b]=(0,H.useState)(void 0),[E,L]=(0,H.useState)(void 0),[A,W]=(0,H.useState)(""),[J,D]=(0,H.useState)("low"),_=(0,H.useRef)(void 0),[O,F]=(0,H.useState)(void 0),[I,P]=(0,H.useState)(void 0),[j,V]=(0,H.useState)(void 0),[C,Y]=(0,H.useState)(void 0),X=(0,H.useRef)(!1),re=(0,H.useRef)(s),de=(0,H.useRef)(l);(0,H.useEffect)(()=>{ke(re.current,s)||(re.current=s,X.current||x(ye(s))),de.current!==l&&(de.current=l,X.current||M(Ae(l)))},[s,l]);let We=!ke(Ge(g),s)||!ft(v,l),$=()=>{X.current=!0,L(void 0),W(""),D("low"),F(void 0),P(void 0)},et=(w,i)=>{$(),x(m=>{let S={...m,[w]:{...m[w],on:i}};return i&&w!=="off"&&S[w].wire.trim().length===0&&(S[w]={...S[w],wire:w}),S}),b(void 0)},tt=(w,i)=>{$(),x(m=>({...m,[w]:{...m[w],wire:i}})),b(void 0)},Re=w=>{$(),M({declared:!0,image:w}),b(void 0)},Se=()=>{$(),M({declared:!1,image:!1}),b(void 0)},be=w=>{$(),x(ye(w.efforts)),w.input!==void 0&&M(Ae(w.input)),L(w.efforts),W(w.source),D(w.confidence),_.current=w.compat,F(w.input),P(w.inputSource),V(w.contextWindow),Y(w.maxTokens),b({kind:"info",text:a("appliedHint",{source:w.source,confidence:a("confidence_"+w.confidence)})})},Le=async()=>{c(!0),b(void 0);try{let w=k?await f.suggest(e,r,d,{...t===void 0?{}:{api:t},...o===void 0?{}:{baseURL:o}}):await f.suggest(e,r,d);if(!w.ok){b({kind:"error",text:w.error==="no-suggestion"?a("noSuggestion"):w.error});return}be(w.suggestion)}catch(w){b({kind:"error",text:a("writeError",{message:String(w)})})}finally{c(!1)}},Ke=async()=>{let w=Ge(g),i=ft(v,l)?void 0:Qt(v),m=w===void 0&&s===void 0?"keep":w;c(!0),b(void 0);try{if(k){f.stageEfforts(e,r,m,_.current,i??void 0),X.current=!1,b({kind:"success",text:a("staged")});return}let S=await f.writeEfforts(e,r,m,_.current,i);if(!S.ok){b({kind:"error",text:S.error==="invalid-models"?a("invalidModels"):S.error==="conflict"?a("conflict"):S.error});return}X.current=!1,b({kind:"success",text:a("saved")})}catch(S){b({kind:"error",text:a("writeError",{message:String(S)})})}finally{c(!1)}},ze=()=>{X.current=!1,x(ye(s)),M(Ae(l)),L(void 0),W(""),D("low"),_.current=void 0,F(void 0),P(void 0),V(void 0),Y(void 0),b(void 0)},Z=p||T;return(0,R.jsxs)("div",{className:"bre-effort-editor","data-plugin":U,children:[(0,R.jsxs)("div",{className:"bre-effort-head",children:[(0,R.jsx)("span",{className:"bre-effort-title",children:a("reasoningEffort")}),(0,R.jsx)("button",{type:"button",className:"bre-link-button",disabled:Z,onClick:()=>{Le()},children:a("autoAdapt")})]}),(0,R.jsx)("div",{className:"bre-effort-grid",children:ce.map(w=>{let i=g[w];return(0,R.jsxs)("label",{className:"bre-effort-row",children:[(0,R.jsx)("input",{type:"checkbox",checked:i.on,disabled:Z,"aria-label":a("level_"+w)+" "+String(h+1),onChange:m=>{et(w,m.target.checked)}}),(0,R.jsx)("span",{className:"bre-effort-level",children:a("level_"+w)}),i.on?(0,R.jsx)("input",{type:"text",className:"bre-effort-wire",value:i.wire,disabled:Z,placeholder:a("wirePlaceholder"),"aria-label":a("level_"+w)+" "+a("wireValue"),onChange:m=>{tt(w,m.target.value)}}):(0,R.jsx)("span",{className:"bre-effort-empty"})]},w)})}),(0,R.jsxs)("div",{className:"bre-modality",children:[(0,R.jsx)("span",{className:"bre-effort-title",children:a("inputModality")}),(0,R.jsxs)("label",{className:"bre-modality-row",children:[(0,R.jsx)("input",{type:"checkbox",checked:v.declared&&v.image,disabled:Z,"aria-label":a("modalityImage")+" "+String(h+1),onChange:w=>{Re(w.target.checked)}}),(0,R.jsx)("span",{className:"bre-effort-level",children:a("modalityImage")}),v.declared?(0,R.jsx)("button",{type:"button",className:"bre-link-button bre-modality-clear",disabled:Z,onClick:Se,children:a("clearDeclaration")}):null]}),v.declared?null:(0,R.jsx)("p",{className:"bre-modality-note",children:a("modalityInherit")})]}),k?(0,R.jsx)("p",{className:"bre-effort-note",children:a("stagedHint")}):null,s===!1?(0,R.jsx)("p",{className:"bre-effort-note",children:a("reasoningDisabled")}):null,E!==void 0?(0,R.jsxs)("div",{className:"bre-suggestion",children:[(0,R.jsx)("p",{className:"bre-effort-note",children:a("appliedHint",{source:A,confidence:a("confidence_"+J)})}),I===void 0?null:(0,R.jsx)("p",{className:"bre-effort-note",children:a(I==="endpoint"?"inputHintEndpoint":I==="knowledge"?"inputHintKnowledge":"inputHintHeuristic")}),j===void 0&&C===void 0?null:(0,R.jsxs)("div",{className:"bre-reference",children:[(0,R.jsx)("span",{className:"bre-reference-title",children:a("referenceTitle")}),(0,R.jsxs)("span",{className:"bre-reference-values",children:[j===void 0?null:(0,R.jsxs)("span",{children:[a("contextWindowLabel")," ",(0,R.jsx)("b",{children:lt.format(j)})]}),C===void 0?null:(0,R.jsxs)("span",{children:[a("maxTokensLabel")," ",(0,R.jsx)("b",{children:lt.format(C)})]})]})]})]}):null,y===void 0?null:(0,R.jsx)("p",{className:"bre-effort-message bre-"+y.kind,role:y.kind==="error"?"alert":"status",children:y.text}),(0,R.jsxs)("div",{className:"bre-effort-actions",children:[(0,R.jsx)("button",{type:"button",className:"bre-primary-button",disabled:Z||!We,onClick:()=>{Ke()},children:a(T?"saving":k?"stage":"apply")}),(0,R.jsx)("button",{type:"button",className:"bre-secondary-button",disabled:Z,onClick:ze,children:a("reset")})]})]})}var q=e=>typeof e=="object"&&e!==null&&!Array.isArray(e);function je(e,n){if(!q(e))return[];let t=e[n];return!q(t)||!Array.isArray(t.models)?[]:t.models.filter(q)}function Ne(e,n){if(!q(e))return{};let t=e[n];if(!q(t))return{};let o=typeof t.api=="string"?t.api:void 0,r=typeof t.baseURL=="string"?t.baseURL:void 0,d=typeof t.displayName=="string"?t.displayName:void 0;return{api:o,baseURL:r,displayName:d}}var pe=(e,n)=>typeof e[n]=="boolean";function Jt(e,n){if(Array.isArray(e)){for(let t of e)if(q(t)&&t.id===n)return t}}function Yt(e){if(!q(e))return{reasoning:"unknown",source:null};let n=e.supported_features;if(Array.isArray(n)&&n.includes("reasoning"))return{...oe(e),reasoning:!0,source:"supported_features"};let t=e.supported_parameters;if(Array.isArray(t)&&(t.includes("reasoning")||t.includes("include_reasoning")||t.includes("reasoning_effort")))return{...oe(e),reasoning:!0,source:"supported_parameters"};if(pe(e,"supports_reasoning"))return{...oe(e),reasoning:e.supports_reasoning,source:"supports_reasoning"};if(pe(e,"supportsReasoning"))return{...oe(e),reasoning:e.supportsReasoning,source:"supportsReasoning"};if(pe(e,"can_reason"))return{...oe(e),reasoning:e.can_reason,source:"can_reason"};if(pe(e,"reasoning"))return{...oe(e),reasoning:e.reasoning,source:"reasoning"};let o=e.reasoning_effort;return o!=null&&!(typeof o=="string"&&o.trim().length===0)||e.supports_reasoning_effort===!0?{...oe(e),reasoning:!0,source:"reasoning_effort"}:{...oe(e),reasoning:"unknown",source:null}}function oe(e){let n={},t=s=>{if(!Array.isArray(s))return;let l=s.filter(h=>typeof h=="string");return l.length>0?l.map(h=>h.toLowerCase()):[]},o=q(e.architecture)?e.architecture:void 0,r=t(o?.input_modalities);if(r===void 0&&(r=t(e.input_modalities)),r===void 0){let s=q(e.modalities)?e.modalities:void 0;r=t(s?.input)}r===void 0&&[e.supported_features,e.capabilities].filter(Array.isArray).some(l=>l.some(h=>typeof h=="string"&&h.toLowerCase()==="vision"))&&(r=["image"]),r===void 0&&(pe(e,"supports_vision")?r=e.supports_vision===!0?["image"]:[]:pe(e,"supportsVision")&&(r=e.supportsVision===!0?["image"]:[])),r!==void 0&&(n.input=r.length===0?["text"]:r);let d=e.context_length;if(typeof d=="number"&&Number.isFinite(d)&&d>0)n.contextLength=d;else{let l=(q(e.top_provider)?e.top_provider:void 0)?.context_length;typeof l=="number"&&Number.isFinite(l)&&l>0&&(n.contextLength=l)}return n}function ut(e,n){let t=Jt(e,n);return t===void 0?{found:!1,signal:{reasoning:"unknown",source:null}}:{found:!0,signal:Yt(t)}}function ge(e){let t=e?.value?.providers;return typeof t!="object"||t===null||Array.isArray(t)?{}:Object.fromEntries(Object.entries(t).filter(([,o])=>typeof o=="object"&&o!==null&&!Array.isArray(o)))}function Xe(e,n){let t=e.find(r=>r.id===n);if(t===void 0)return;let o=t.reasoningEfforts;if(o===!1)return!1;if(typeof o=="object"&&o!==null&&!Array.isArray(o))return o}function $e(e,n){let o=e.find(d=>d.id===n)?.input;if(!Array.isArray(o))return;let r=o.filter(d=>typeof d=="string");return r.length>0?r:void 0}function Qe(e,n){let o=e.find(r=>r.id===n)?.name;return typeof o=="string"&&o.length>0?o:void 0}async function Zt(e,n){try{let t=await fetch(`${rt}?route=${encodeURIComponent(e)}`,{method:"GET"});if(!t.ok)return{reasoning:"unknown",source:null};let o=await t.json();return o?.ok?ut(o.data,n).signal:{reasoning:"unknown",source:null}}catch{return{reasoning:"unknown",source:null}}}function He(e,n=()=>me(e),t){return{async suggest(o,r,d,s){let l=ge((await n()).namespace),h=Ne(l,o),k={api:h.api??s?.api,baseURL:h.baseURL??s?.baseURL,displayName:d??h.displayName},f=l[o]===void 0?void 0:await Zt(o,r),p=Ie(r,k,f);return p.efforts===void 0?{ok:!1,error:"no-suggestion"}:{ok:!0,suggestion:{efforts:p.efforts,...p.compat===void 0?{}:{compat:p.compat},...p.input===void 0?{}:{input:p.input},...p.inputSource===void 0?{}:{inputSource:p.inputSource},...p.contextWindow===void 0?{}:{contextWindow:p.contextWindow},...p.maxTokens===void 0?{}:{maxTokens:p.maxTokens},matched:p.matched,source:p.source,confidence:p.confidence,...p.endpoint===void 0?{}:{endpoint:p.endpoint}}}},stageEfforts(o,r,d,s,l){t?.(o,r,d,s,l)},async writeEfforts(o,r,d,s,l){let h=d==="keep"?void 0:d,k=d!=="keep";for(let f=0;f<2;f++)try{let p=await n();if(p.namespace===void 0)return{ok:!1,error:"no-namespace"};let g=ge(p.namespace)[o]?.models;if(!Array.isArray(g))return{ok:!1,error:"model-not-found"};if(!g.every(q))return{ok:!1,error:"invalid-models"};let x=g,v=x.findIndex(c=>c.id===r);if(v<0)return{ok:!1,error:"model-not-found"};let M=x.map((c,y)=>{if(y!==v)return c;let b={...c};return k&&(h===void 0?(delete b.reasoningEfforts,b[fe]=!0):(delete b[fe],h===!1?b.reasoningEfforts=!1:(b.reasoningEfforts={...h},s!==void 0&&(b.compat={...s})))),l!==void 0&&(l===null?(delete b.input,b[ue]=!0):(delete b[ue],b.input=[...l])),b}),T=await e.settings.mutate({ns:xe,ops:[{op:"set",path:["providers",o,"models"],value:M}],expectedRevision:p.namespace.revision});if(!T.result.ok){let c=T.result.error.code;if(f===0&&(c==="settings-conflict"||c==="settings/conflict"))continue;return{ok:!1,error:T.result.error.message}}return{ok:!0}}catch(p){return{ok:!1,error:p instanceof Error?p.message:String(p)}}return{ok:!1,error:"conflict"}}}}async function me(e){let n=await e.settings.describe({});return n.result.ok?{namespace:n.result.value.namespaces.find(o=>o.ns===xe),writable:n.result.value.writable}:{namespace:void 0,writable:!1}}function Pe(e,n){return Object.prototype.hasOwnProperty.call(e,n)}var ct=["Capacities","\u5BB9\u91CF"],en=["Model ID","\u6A21\u578B ID"],tn=["Display name","\u663E\u793A\u540D\u79F0"],pt=["Provider ID"],nn=["Base URL","API \u5730\u5740"],on=["API protocol","API \u534F\u8BAE"];function mt(){return{mounted:new Map,describePromise:void 0,pending:new Map,missedScans:new Map}}function Ce(e,n,t,o,r,d){let s=e.pending.get(n);if(o===void 0){if(s===void 0)return;s.delete(t),s.size===0&&e.pending.delete(n);return}e.pending.set(n,(s??new Map).set(t,{efforts:o,...r===void 0?{}:{compat:r},...d===void 0?{}:{input:d}}))}function rn(e,n,t){if(n===void 0)return null;let r=n[fe]!==!0&&t?.efforts!==void 0&&sn(n.reasoningEfforts,t.efforts)?!1:n.reasoningEfforts!==void 0||n[fe]===!0||e.efforts==="keep",s=n[ue]!==!0&&t?.input!==void 0&&an(n.input,t.input)?!1:Array.isArray(n.input)&&n.input.length>0||n[ue]===!0,l=r?"keep":e.efforts,h=s?void 0:e.input;return l==="keep"&&h===void 0?null:{efforts:l,...e.compat===void 0?{}:{compat:e.compat},...h===void 0?{}:{input:h}}}function sn(e,n){if(e===n)return!0;if(!dn(e)||typeof n!="object"||n===null||Array.isArray(n))return!1;let t=Object.keys(n);return Object.keys(e).length!==t.length?!1:t.every(o=>e[o]===n[o])}function an(e,n){if(!Array.isArray(e)||e.length!==n.length)return!1;let t=new Set(n);return e.every(o=>typeof o=="string"&&t.has(o))}function dn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}async function ln(e,n,t,o){let r=e.wire();if(r!==void 0)for(let[d,s]of[...o]){let l=await e.describeNamespace(),h=ge(l.namespace),k=je(h,t).find(T=>T.id===d);if(k===void 0||n.pending.get(t)?.get(d)!==s)continue;let f=Ne(h,t),p=typeof k.name=="string"?k.name:void 0,a=Ie(d,p===void 0?f:{...f,displayName:p}),g=rn(s,k,{...a.efforts===void 0?{}:{efforts:a.efforts},...a.input===void 0?{}:{input:a.input}});if(g===null){Ce(n,t,d,void 0);continue}let x=!1,M=await He(r,()=>x?me(r):(x=!0,Promise.resolve(l))).writeEfforts(t,d,g.efforts,g.compat,g.input);M.ok||M.error==="model-not-found"?Ce(n,t,d,void 0):console.error(`[bre] staged flush write failed for "${t}"/"${d}": ${M.error}`)}}function ve(e,n){for(let t of n){let o=Array.from(e.querySelectorAll("input[aria-label], select[aria-label]")).find(r=>(r.getAttribute("aria-label")??"").startsWith(t));if(o!==void 0&&o.value.trim().length>0)return o.value.trim()}return""}function ht(e){return e.closest('[class*="editor"], [class*="rowCard"], [class*="addCard"]')??void 0}function fn(e){let n=e.closest('[class*="modelEntry"]');if(n===null){let o=ht(e);if(o===void 0)return;let r=Array.from(o.querySelectorAll('[class*="modelAdvanced"]'));return r.find(d=>d.offsetParent!==null)??r[0]}let t=Array.from(n.querySelectorAll('[class*="modelAdvanced"]'));return t.find(o=>o.offsetParent!==null)??t[0]}function un(e){return e.querySelector(`[data-plugin="${U}"]`)!==null}function cn(e,n){return e.route===n.route&&e.routeDisplayName===n.routeDisplayName&&e.routeApi===n.routeApi&&e.routeBaseURL===n.routeBaseURL&&e.modelId===n.modelId&&e.modelName===n.modelName&&e.index===n.index&&e.readOnly===n.readOnly&&e.staged===n.staged&&ke(e.efforts,n.efforts)&&pn(e.input,n.input)}function pn(e,n){if(e===n)return!0;if(e===void 0||n===void 0)return!1;let t=new Set(e);return e.length===n.length&&n.every(o=>t.has(o))}function gn(e,n){return Array.from(e.querySelectorAll("input[aria-label], select[aria-label]")).some(t=>n.some(o=>(t.getAttribute("aria-label")??"").startsWith(o)))}function gt(e,n){let t=e.querySelector('[class*="editorRoute"]')?.textContent?.trim();if(t!==void 0&&t.length>0&&Pe(n,t))return{route:t,staged:!1};if(gn(e,pt)){let d=ve(e,pt);return d.length>0&&!Pe(n,d)?{route:d,staged:!0}:void 0}let o=e.querySelector('[class*="editorTitle"], [class*="rowName"]')?.textContent?.trim();if(o===void 0||o.length===0)return;let r=Object.entries(n).find(([,d])=>d.displayName===o);return r===void 0?void 0:{route:r[0],staged:!1}}function bt(e,n,t){if(!e.isConnected)return;let o=n.wire();if(o===void 0)return;if(!ct.some(s=>e.querySelector(`button[aria-label^="${s}"]`)!==null)){if(t.mounted.size>0){for(let[,s]of t.mounted)s.editor.unmount();t.mounted.clear()}return}t.describePromise??(t.describePromise=n.describeNamespace());let d=s=>{if(!e.isConnected)return;let l=s.namespace,h=ge(l);if(s.writable===!0)for(let[f,p]of t.pending){if(p.size===0){t.pending.delete(f);continue}Pe(h,f)&&ln(n,t,f,p).catch(a=>{console.error(`[bre] staged flush failed for "${f}": ${a instanceof Error?a.message:String(a)}`)})}let k=[];for(let f of ct){let p=Array.from(e.querySelectorAll("button[aria-label]")).filter(a=>(a.getAttribute("aria-label")??"").startsWith(f));for(let a of p){let g=fn(a);if(g===void 0)continue;let x=ht(a);if(x===void 0)continue;let v=a.closest('[class*="modelEntry"]')??x,M=ve(v,en);M.length!==0&&k.push({container:g,row:v,modelId:M,card:x})}}for(let[f,p]of t.mounted)k.some(a=>a.container===f)||(p.editor.unmount(),t.mounted.delete(f));if(t.pending.size>0){let f=new Map;for(let a of k){let g=gt(a.card,h);if(g===void 0)continue;let x=f.get(g.route);x===void 0&&f.set(g.route,x=new Set),x.add(a.modelId)}let p=new Map;for(let[a,g]of t.pending){if(!Pe(h,a))continue;let x=f.get(a),v=[...g.keys()].filter(M=>!x?.has(M));v.length>0&&p.set(a,new Set(v))}for(let[a,g]of p){let x=t.missedScans.get(a);if(x!==void 0)for(let v of g)x.has(v)&&(Ce(t,a,v,void 0),x.delete(v))}t.missedScans=p}k.forEach((f,p)=>{let a=gt(f.card,h);if(a===void 0)return;let{route:g,staged:x}=a,v=h[g]??{},M=je(h,g),T=x||!M.some(I=>I.id===f.modelId),c=T?t.pending.get(g)?.get(f.modelId)?.efforts:void 0,y=T?c==="keep"?void 0:c:Xe(M,f.modelId),b=T?t.pending.get(g)?.get(f.modelId)?.input:$e(M,f.modelId),E=T?ve(f.row,tn):"",L=T?E.length>0?E:void 0:Qe(M,f.modelId),A=x?ve(f.card,on):"",W=x?ve(f.card,nn):"",J=x&&A.length>0?A:typeof v.api=="string"?v.api:void 0,D=x&&W.length>0?W:typeof v.baseURL=="string"?v.baseURL:void 0,_={route:g,routeDisplayName:x?g:typeof v.displayName=="string"?v.displayName:g,...J===void 0?{}:{routeApi:J},...D===void 0?{}:{routeBaseURL:D},modelId:f.modelId,...L===void 0?{}:{modelName:L},...y===void 0?{}:{efforts:y},...b===void 0?{}:{input:b},index:p,staged:T,api:He(o,void 0,(I,P,j,V,C)=>{Ce(t,I,P,j,V,C)}),readOnly:s.writable!==!0,t:n.t},O=t.mounted.get(f.container);if(O!==void 0){cn(O.props,_)||(O.props=_,O.editor.render(_));return}if(un(f.container))return;let F=n.mount(f.container,_);t.mounted.set(f.container,{editor:F,props:_})})};t.describePromise.then(d,()=>{t.describePromise=void 0})}var xt={reasoningEffort:"Reasoning effort",autoAdapt:"Auto-adapt",apply:"Apply",saving:"Saving\u2026",reset:"Reset",saved:"Saved.",appliedHint:"Applied suggestion from {source} \xB7 confidence: {confidence}",inputHintEndpoint:"Modality advice comes from the endpoint listing.",inputHintKnowledge:"Modality advice comes from the knowledge base.",inputHintHeuristic:"Modality guessed from the name alone (low confidence) \u2014 verify.",referenceTitle:"Reference capacities (hints only, never auto-filled)",contextWindowLabel:"Context window",maxTokensLabel:"Max output",inputModality:"Input modalities",modalityImage:"Image input",modalityInherit:"Not declared \u2014 the provider default applies (usually text-only).",clearDeclaration:"Clear declaration",confidence_high:"high",confidence_medium:"medium",confidence_low:"low \u2014 verify before relying on it",noSuggestion:"No suggestion is available for this model.",invalidModels:"The model list carries rows this editor cannot safely rewrite.",conflict:"The settings document kept changing under this edit. Wait a moment, then apply again.",writeError:"Failed: {message}",renderFailed:"Reasoning-effort editor failed to render",wirePlaceholder:"Wire value",wireValue:"value",reasoningDisabled:"No reasoning-effort control declared for this model (false) \u2014 do not arm thinking levels.",stage:"Stage",staged:"Staged \u2014 it will be applied automatically once saved.",stagedHint:"Not saved yet. Staged settings are applied automatically once the model is saved.",level_off:"off",level_minimal:"minimal",level_low:"low",level_medium:"medium",level_high:"high",level_xhigh:"xhigh",level_max:"max",panelEmpty:"No saved models to configure yet \u2014 save a model row first.",advancedSettings:"Advanced settings",advancedSettingsOpen:"Close advanced settings",sliderToggleTitle:"Reasoning effort slider",sliderToggleDescription:"Show a reasoning-effort slider with dynamic radiation effects in the model menu; the levels adapt to the current model.",sliderToggleAria:"Enable reasoning effort slider",settingOn:"On",settingOff:"Off",sliderEffortAria:"Reasoning effort",sliderNoLevels:"The current model exposes no reasoning-effort levels.",triggerFallback:"Select model",effortDefault:"Default",sliderEffortTitle:"Reasoning effort \xB7 {name}",sliderEffortTitleError:"Reasoning effort failed: {error}",sliderNoCurrent:"No model selected."},wt={reasoningEffort:"\u601D\u8003\u5F3A\u5EA6",autoAdapt:"\u81EA\u52A8\u9002\u914D",apply:"\u5E94\u7528",saving:"\u4FDD\u5B58\u4E2D\u2026",reset:"\u653E\u5F03\u4FEE\u6539",saved:"\u5DF2\u4FDD\u5B58\u3002",appliedHint:"\u5DF2\u6309 {source} \u5E94\u7528\u5EFA\u8BAE \xB7 \u7F6E\u4FE1\u5EA6\uFF1A{confidence}",inputHintEndpoint:"\u6A21\u6001\u5EFA\u8BAE\u6765\u81EA\u7AEF\u70B9\u5217\u8868\u3002",inputHintKnowledge:"\u6A21\u6001\u5EFA\u8BAE\u6765\u81EA\u77E5\u8BC6\u5E93\u3002",inputHintHeuristic:"\u6A21\u6001\u5EFA\u8BAE\u4EC5\u6309\u547D\u540D\u63A8\u65AD\uFF08\u4F4E\u7F6E\u4FE1\u5EA6\uFF09\uFF0C\u8BF7\u6838\u5BF9\u3002",referenceTitle:"\u53C2\u8003\u5BB9\u91CF\uFF08\u4EC5\u63D0\u793A\uFF0C\u4E0D\u81EA\u52A8\u586B\u5145\uFF09",contextWindowLabel:"\u4E0A\u4E0B\u6587\u7A97\u53E3",maxTokensLabel:"\u6700\u5927\u8F93\u51FA",inputModality:"\u8F93\u5165\u6A21\u6001",modalityImage:"\u56FE\u7247\u8F93\u5165",modalityInherit:"\u672A\u58F0\u660E\u2014\u2014\u7EE7\u627F\u63D0\u4F9B\u65B9\u9ED8\u8BA4\uFF08\u901A\u5E38\u4EC5\u6587\u672C\uFF09\u3002",clearDeclaration:"\u6E05\u9664\u58F0\u660E",confidence_high:"\u9AD8",confidence_medium:"\u4E2D",confidence_low:"\u4F4E\uFF08\u5EFA\u8BAE\u6838\u5BF9\uFF09",noSuggestion:"\u6CA1\u6709\u9002\u7528\u4E8E\u8BE5\u6A21\u578B\u7684\u5EFA\u8BAE\u3002",invalidModels:"\u6A21\u578B\u5217\u8868\u5305\u542B\u8BE5\u7F16\u8F91\u5668\u65E0\u6CD5\u5B89\u5168\u91CD\u5199\u7684\u884C\u3002",conflict:"\u8BBE\u7F6E\u6587\u6863\u5728\u4FDD\u5B58\u671F\u95F4\u6301\u7EED\u53D8\u5316\uFF0C\u8BF7\u7A0D\u5019\u518D\u6B21\u5E94\u7528\u3002",writeError:"\u5199\u5165\u5931\u8D25\uFF1A{message}",renderFailed:"\u601D\u8003\u5F3A\u5EA6\u7F16\u8F91\u5668\u6E32\u67D3\u5931\u8D25",wirePlaceholder:"\u7EBF\u4E0A\u53D6\u503C",wireValue:"\u53D6\u503C",reasoningDisabled:"\u8BE5\u6A21\u578B\u58F0\u660E\u4E3A\u65E0 reasoning-effort \u63A7\u5236\uFF08false\uFF09\u2014\u2014\u8BF7\u52FF\u52FE\u9009\u601D\u8003\u6863\u3002",stage:"\u6682\u5B58",staged:"\u5DF2\u6682\u5B58\u2014\u2014\u4FDD\u5B58\u540E\u5C06\u81EA\u52A8\u5E94\u7528\u3002",stagedHint:"\u5C1A\u672A\u4FDD\u5B58\u3002\u6682\u5B58\u7684\u914D\u7F6E\u5C06\u5728\u8BE5\u6A21\u578B\u4FDD\u5B58\u540E\u81EA\u52A8\u5E94\u7528\u3002",level_off:"off",level_minimal:"minimal",level_low:"low",level_medium:"medium",level_high:"high",level_xhigh:"xhigh",level_max:"max",panelEmpty:"\u5C1A\u65E0\u5DF2\u4FDD\u5B58\u7684\u6A21\u578B\u2014\u2014\u8BF7\u5148\u4FDD\u5B58\u6A21\u578B\u884C\u518D\u914D\u7F6E\u3002",sliderToggleTitle:"\u63A8\u7406\u5F3A\u5EA6\u6ED1\u5757",sliderToggleDescription:"\u5728\u6A21\u578B\u83DC\u5355\u4E2D\u663E\u793A\u63A8\u7406\u5F3A\u5EA6\u6ED1\u5757\u548C\u52A8\u6001\u8F90\u5C04\u7279\u6548\uFF0C\u6863\u4F4D\u968F\u5F53\u524D\u6A21\u578B\u81EA\u52A8\u9002\u914D",sliderToggleAria:"\u542F\u7528\u63A8\u7406\u5F3A\u5EA6\u6ED1\u5757",settingOn:"\u542F\u7528",settingOff:"\u505C\u7528",sliderEffortAria:"\u63A8\u7406\u5F3A\u5EA6",sliderNoLevels:"\u5F53\u524D\u6A21\u578B\u672A\u63D0\u4F9B\u63A8\u7406\u5F3A\u5EA6\u6863\u4F4D",triggerFallback:"\u9009\u62E9\u6A21\u578B",effortDefault:"\u9ED8\u8BA4",sliderEffortTitle:"\u63A8\u7406\u5F3A\u5EA6 \xB7 {name}",sliderEffortTitleError:"\u63A8\u7406\u5F3A\u5EA6\u8BBE\u7F6E\u5931\u8D25\uFF1A{error}",sliderNoCurrent:"\u5F53\u524D\u65E0\u9009\u62E9\u4E2D\u7684\u6A21\u578B\u3002"};var u=require("react");function yt(e){if(e.current===null)return[];let o=e.groups.find(r=>r.id===e.current?.provider)?.models.find(r=>r.id===e.current?.model)?.reasoning?.efforts;return o!==void 0&&o.length>=2?o:[]}function mn(e){return e.current}function kt(e,n){let t=mn(n),o=e.findIndex(l=>l.id===t?.reasoningEffort);if(o>=0)return o;let d=n.groups.find(l=>l.id===t?.provider)?.models.find(l=>l.id===t?.model)?.reasoning?.defaultEffort,s=d===void 0?-1:e.findIndex(l=>l.id===d);return s>=0?s:Math.floor((e.length-1)/2)}function hn(e,n,t,o,r){let d=r.progress*n,s=document.body.hasAttribute("data-ds-dark-theme"),l=4,h=r.dragging?2.8:1;if(e.clearRect(0,0,n,t),d<=0)return;e.save(),e.beginPath(),e.rect(0,0,d,t),e.clip();for(let f=0;f<d;f+=l){let p=f+l*.5-d,a=Math.abs(p),g=a/10-o*.0074*h,x=a/23-o*.0041*h+1.7,v=a/40-o*.0022*h+3.4,M=Math.max(0,Math.sin(g)),T=Math.max(0,Math.sin(x)),c=Math.max(0,Math.sin(v)),y=Math.pow(M,2.6),b=Math.pow(T,3.2),E=Math.pow(c,4),L=Math.pow(M,15)+Math.pow(T,18)*.78,A=Math.min(1,y*.76+b*.58+E*.32),W=.38+.62*Math.exp(-a/Math.max(55,n*.72)),J=Math.pow(Math.max(0,Math.sin(f/20+o*.0016)),3)*.27,D=W*(A*1.04+J+L*.32);if(D>.012){let _=Math.max(0,1-a/Math.max(1,n*.78)),O=Math.round(s?42+124*_+75*A:28+58*_+15*A),F=Math.round(s?56+58*_+44*L:88+72*_+30*L),I=Math.round(s?175+72*_+8*A:182+62*_),P=s?Math.min(.88,D*.72):Math.min(.62,D*.54);e.fillStyle="rgba("+String(O)+", "+String(F)+", "+String(I)+", "+String(P)+")",e.fillRect(f,0,l-1,t)}for(let _=0;_<t;_+=l){let O=_+l*.5-t*.5,F=Math.hypot(p/38,O/11),I=Math.exp(-F*.96)*1.08,P=.58+.42*Math.cos(O/t*Math.PI),j=.72+.28*Math.sin(f*.73+_*1.31+o*.006),V=Math.min(.96,(D*.88+I+L*.19)*P*j);if(V<.035)continue;let C=Math.max(0,1-F/2.4),Y=Math.round(s?54+148*C+42*A+35*L:25+72*C+12*A),X=Math.round(s?68+78*C+46*L:98+72*C+24*L),re=Math.round(s?186+64*C:194+56*C);e.fillStyle="rgba("+String(Y)+", "+String(X)+", "+String(re)+", "+String(s?V:V*.72)+")",e.fillRect(f,_,l-1,l-1)}}for(let f=0;f<14;f+=1){let p=(o*(r.dragging?.16:.065)*(.78+f%5*.09)+f*23)%Math.max(30,d+64),a=d-p;if(a<-24||a>n+16)continue;let g=3+(f*13+Math.sin(o*.003+f)*5)%Math.max(7,t-6),x=4+f%4*4+(r.dragging?6:0),v=.28+f%5*.1,M=e.createLinearGradient(a,0,a+x,0);M.addColorStop(0,s?"rgba(72,118,255,0)":"rgba(24,94,184,0)"),M.addColorStop(.68,s?"rgba(112,135,255,"+String(v)+")":"rgba(36,108,202,"+String(v*.72)+")"),M.addColorStop(1,s?"rgba(236,222,255,"+String(Math.min(1,v+.26))+")":"rgba(103,175,248,"+String(Math.min(.82,v+.18))+")"),e.fillStyle=M,e.fillRect(a,g,x,f%3===0?2:1)}let k=e.createRadialGradient(d,t/2,0,d,t/2,24);k.addColorStop(0,s?"rgba(255,255,255,.82)":"rgba(255,255,255,.86)"),k.addColorStop(.14,s?"rgba(183,190,255,.54)":"rgba(162,210,255,.48)"),k.addColorStop(.44,s?"rgba(103,74,255,.28)":"rgba(37,112,207,.22)"),k.addColorStop(1,s?"rgba(86,31,210,0)":"rgba(25,91,181,0)"),e.fillStyle=k,e.fillRect(d-26,0,52,t),e.restore()}function vt(e){let{directory:n,t}=e,o=(0,u.useSyncExternalStore)(i=>n.store.subscribe(i),()=>n.store.getSnapshot()),r=yt(o),[d,s]=(0,u.useState)(""),[l,h]=(0,u.useState)(0),[k,f]=(0,u.useState)(!1),[p,a]=(0,u.useState)(!1),[g,x]=(0,u.useState)(null),v=(0,u.useRef)(null),M=(0,u.useRef)(null),T=(0,u.useRef)(""),c=(0,u.useRef)(!1),y=(0,u.useRef)(0),b=(0,u.useRef)(!1),E=(0,u.useRef)(!1),L=(0,u.useRef)(null),A=(0,u.useRef)(null),W=(0,u.useRef)(null),J=(0,u.useRef)(null),D=(0,u.useRef)({progress:.5,dragging:!1}),_=(0,u.useRef)(null),O=o.current!==null&&r.length>=2,F=k||o.status==="selecting",I=g??o.error;(0,u.useEffect)(()=>{if(!O||c.current||b.current)return;let i=kt(r,o),m=r[i]?.id??"";T.current=m,y.current=i,s(m),h(i),x(null)},[O,r,o]),(0,u.useEffect)(()=>{n.load().catch(()=>{})},[n]),(0,u.useEffect)(()=>{y.current=l,D.current.progress=r.length>=2?l/(r.length-1):.5,_.current?.()},[l,r.length]),(0,u.useEffect)(()=>{D.current.dragging=p,_.current?.()},[p]),(0,u.useEffect)(()=>{let i=v.current;if(i===null)return;let m=i.getContext("2d");if(m===null)return;let N=(typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)"):void 0)??{matches:!1},K=1,B=1,z=0,ie=()=>{let ee=i.getBoundingClientRect(),ne=Math.min(window.devicePixelRatio||1,2);K=Math.max(1,ee.width),B=Math.max(1,ee.height),i.width=Math.max(1,Math.round(K*ne)),i.height=Math.max(1,Math.round(B*ne)),m.setTransform(ne,0,0,ne,0,0)},se=(ee=performance.now())=>{hn(m,K,B,ee,D.current)},ae=ee=>{se(ee),z=window.requestAnimationFrame(ae)},le=()=>{N.matches&&se()},te;typeof ResizeObserver=="function"&&(te=new ResizeObserver(()=>{ie(),se()}),te.observe(i));let _e=new MutationObserver(()=>se());return _e.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme"]}),_.current=le,ie(),se(),!N.matches&&typeof window.requestAnimationFrame=="function"&&(z=window.requestAnimationFrame(ae)),()=>{typeof window.cancelAnimationFrame=="function"&&window.cancelAnimationFrame(z),te?.disconnect(),_e.disconnect(),_.current=null}},[]);let P=(i,m)=>i.findIndex(S=>S.id===m),j=(0,u.useCallback)(()=>{let i=T.current;y.current=Math.max(0,P(r,i)),E.current=!1,L.current=null,b.current=!1,s(i),h(Math.max(0,P(r,i))),a(!1)},[r]),V=(0,u.useCallback)(async i=>{if(c.current)return;c.current=!0;let m=T.current;a(!1),f(!0),x(null);let S=(B,z)=>Math.max(0,Math.min(z-1,Math.round(B))),N=S(i,r.length),K=r[N]?.id;K!==void 0&&(y.current=N,h(N),s(K));try{let z=await n.load(),ie=z.current??null,se={current:ie,groups:z.groups??o.groups,status:"ready",error:null},ae=yt(se),le=S(i,ae.length),te=ae[le]?.id;if(te===void 0)throw new Error(t("sliderNoLevels"));if(y.current=le,h(le),s(te),ie===null)throw new Error(t("sliderNoCurrent"));await n.select({provider:ie.provider,model:ie.model,reasoningEffort:te});let _e=n.store.getSnapshot(),ee=P(ae,_e.current?.reasoningEffort),ne=ee>=0?ee:le,nt=ae[ne]?.id??te;T.current=nt,y.current=ne,s(nt),h(ne)}catch(B){let z=Math.max(0,P(r,m));T.current=m,y.current=z,s(m),h(z),x(B instanceof Error?B.message:String(B))}finally{c.current=!1,f(!1)}},[n,r,o.groups]),C=(i,m)=>{let S=i.getBoundingClientRect();return S.width<=0||r.length<2?y.current:Math.max(0,Math.min(r.length-1,(m-S.left)/S.width*(r.length-1)))},Y=i=>{let m=(S,N)=>Math.max(0,Math.min(N-1,Math.round(S)));y.current=i,h(i),s(r[m(i,r.length)]?.id??"")},X=(i,m,S)=>{E.current=!0,L.current=m,b.current=!0,a(!0),Y(C(i,S));try{i.hasPointerCapture(m)||i.setPointerCapture(m)}catch{}},re=(i,m,S)=>{!E.current||L.current!==m||Y(C(i,S))},de=(i,m,S)=>{if(!E.current||m!==void 0&&L.current!==m)return;let N=S===void 0?y.current:C(i,S);E.current=!1,L.current=null,b.current=!1,m!==void 0&&i.hasPointerCapture(m)&&i.releasePointerCapture(m),Y(N),V(N)};A.current=i=>{let m=M.current;m!==null&&re(m,i.pointerId,i.clientX)},W.current=i=>{let m=M.current;m!==null&&de(m,i.pointerId,i.clientX)},J.current=i=>{L.current===i.pointerId&&j()},(0,u.useEffect)(()=>{let i=N=>A.current?.(N),m=N=>W.current?.(N),S=N=>J.current?.(N);return window.addEventListener("pointermove",i,!0),window.addEventListener("pointerup",m,!0),window.addEventListener("pointercancel",S,!0),()=>{window.removeEventListener("pointermove",i,!0),window.removeEventListener("pointerup",m,!0),window.removeEventListener("pointercancel",S,!0)}},[]);let We=i=>{let m=r.length,N=((B,z)=>Math.max(0,Math.min(z,Math.round(B))))(Number(i.currentTarget.value),m-1),K;i.key==="ArrowLeft"||i.key==="ArrowDown"||i.key==="PageDown"?K=Math.max(0,N-1):i.key==="ArrowRight"||i.key==="ArrowUp"||i.key==="PageUp"?K=Math.min(m-1,N+1):i.key==="Home"?K=0:i.key==="End"&&(K=m-1),K!==void 0&&(i.stopPropagation(),i.preventDefault(),V(K))},$=o.current,Re=o.groups.find(i=>i.id===$?.provider)?.models.find(i=>i.id===$?.model)?.name??($===null?t("triggerFallback"):$.model),Se=r[kt(r,o)]?.name??t("effortDefault");if(!O)return(0,u.createElement)("div",{className:"bre-slider-body"},(0,u.createElement)("div",{className:"bre-slider-advanced"},(0,u.createElement)("span",{className:"bre-slider-hint"},t("sliderNoLevels"))),(0,u.createElement)("div",{className:"bre-menu-separator","aria-hidden":!0}),(0,u.createElement)("button",{type:"button",role:"menuitem",className:"bre-model-row",disabled:F,onClick:()=>{e.pickModel?.()}},(0,u.createElement)("span",{className:"bre-model-row-name"},Re),(0,u.createElement)("span",{className:"bre-model-row-effort"},Se),(0,u.createElement)("span",{className:"bre-row-chevron","aria-hidden":!0},"\u203A")),I===null?null:(0,u.createElement)("div",{className:"bre-model-error",role:"status"},I));let be=r.length,Le=r[P(r,d)]?.name??d,Ke=P(r,d)===be-1,ze=l/(be-1)*100,Z={"--bre-progress":String(ze)+"%","--bre-level-count":String(be)},w=I===null?t("sliderEffortTitle",{name:Le}):t("sliderEffortTitleError",{error:I});return(0,u.createElement)("div",{className:"bre-slider-body"},(0,u.createElement)("div",{className:"bre-slider-advanced"},(0,u.createElement)("div",{className:"bre-effort"+(p?" is-dragging":"")+(F?" is-busy":"")+(I===null?"":" is-error"),title:w},(0,u.createElement)("div",{className:"bre-effort-slider","data-top":Ke?"true":void 0,style:Z},(0,u.createElement)("div",{className:"bre-effort-track","aria-hidden":!0}),(0,u.createElement)("div",{className:"bre-effort-fx","aria-hidden":!0},(0,u.createElement)("canvas",{ref:v,className:"bre-effort-canvas"}),(0,u.createElement)("span",{className:"bre-effort-flare"})),(0,u.createElement)("input",{ref:M,type:"range",className:"bre-effort-input",min:0,max:be-1,step:"0.01",value:l,disabled:F,"aria-label":t("sliderEffortAria"),"aria-valuetext":Le,onChange:i=>{let m=Number(i.currentTarget.value);Y(m)},onPointerDown:i=>{i.preventDefault(),i.currentTarget.focus(),X(i.currentTarget,i.pointerId,i.clientX)},onPointerMove:i=>re(i.currentTarget,i.pointerId,i.clientX),onPointerUp:i=>de(i.currentTarget,i.pointerId,i.clientX),onPointerCancel:i=>{i.currentTarget.hasPointerCapture(i.pointerId)&&i.currentTarget.releasePointerCapture(i.pointerId),j()},onBlur:i=>{de(i.currentTarget)},onKeyDown:We}),(0,u.createElement)("span",{className:"bre-effort-knob","aria-hidden":!0})),I===null?null:(0,u.createElement)("span",{className:"bre-effort-sr",role:"status"},I))),(0,u.createElement)("div",{className:"bre-menu-separator","aria-hidden":!0}),(0,u.createElement)("button",{type:"button",role:"menuitem",className:"bre-model-row",disabled:F,onClick:()=>{e.pickModel?.()}},(0,u.createElement)("span",{className:"bre-model-row-name"},Re),(0,u.createElement)("span",{className:"bre-model-row-effort"},Se),(0,u.createElement)("span",{className:"bre-row-chevron","aria-hidden":!0},"\u203A")),I===null?null:(0,u.createElement)("div",{className:"bre-model-error",role:"status"},I))}var G=require("react");var De="better-basicfun.slider.enabled",bn=["dsh-reasoning-effort.enabled","@dsh-external/dsh-reasoning-effort.enabled"],Ee=xn();function xn(){try{let e=window.localStorage.getItem(De),n=e===null?bn.map(t=>window.localStorage.getItem(t)).find(t=>t!==null):null;return(e??n??null)!=="false"}catch{return!0}}var Je=new Set;function Et(){for(let e of[...Je])e()}function Fe(){return Ee}function Mt(e){if(Ee!==e){Ee=e;try{window.localStorage.setItem(De,String(e))}catch{}Et()}}function Rt(e){Ee!==e&&(Ee=e,Et())}function Oe(e){return Je.add(e),()=>{Je.delete(e)}}function Ye(e){let{t:n}=e,t=(0,G.useSyncExternalStore)(Oe,Fe),o=()=>{Mt(!t)};return(0,G.createElement)("div",{className:"bre-slider-setting"},(0,G.createElement)("div",{className:"bre-slider-setting-row"},(0,G.createElement)("div",{className:"bre-slider-setting-copy"},(0,G.createElement)("div",{className:"bre-slider-setting-title"},n("sliderToggleTitle")),(0,G.createElement)("div",{className:"bre-slider-setting-description"},n("sliderToggleDescription"))),(0,G.createElement)("div",{className:"bre-slider-setting-control"},(0,G.createElement)("span",{className:"bre-slider-setting-state"},n(t?"settingOn":"settingOff")),(0,G.createElement)("button",{type:"button",role:"switch","aria-label":n("sliderToggleAria"),"aria-checked":t,className:"bre-slider-setting-switch"+(t?" is-on":""),onClick:o},(0,G.createElement)("span",{className:"bre-slider-setting-switch-knob","aria-hidden":!0})))))}function St(e,n){return{code:e?.code??"error",message:e?.message??n}}function wn(e){return{settings:{describe:async()=>{try{let n=await e.describe();return n.ok&&n.value!==void 0?{result:{ok:!0,value:n.value}}:{result:{ok:!1,error:St(n.error,"settings describe failed")}}}catch(n){let t=n;return{result:{ok:!1,error:{code:t.code??"error",message:t.message??String(n)}}}}},mutate:async n=>{try{let t=await e.mutate(n.ns,n.ops,n.expectedRevision);return t.ok?{result:{ok:!0,value:t.value}}:{result:{ok:!1,error:St(t.error,"settings mutate failed")}}}catch(t){let o=t;return{result:{ok:!1,error:{code:o.code??"error",message:o.message??String(t)}}}}}}}}function Lt(e){let n=e.get?.("remote.settings");if(n!==void 0&&typeof n.describe=="function")return wn(n);let o=e.get?.("connection")?.api;if(o?.settings!==void 0)return o}var _t=`
/* The injector's mount wrapper. It \u2014 not the editor inside it \u2014 is the item
   placed into the official row disclosure's repeat(auto-fit, minmax(160px,1fr))
   grid (context window and max tokens take two cells), so the span belongs
   here: on the editor itself it would target the wrapper's block box and be
   ignored, squeezing the block into one cell. */
.bre-effort-slot {
  grid-column: 1 / -1;
}
.bre-effort-editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0 4px;
  padding: 10px 12px;
  border: 1px solid var(--dsh-border, rgba(128,128,128,0.25));
  border-radius: 8px;
  background: var(--dsh-surface, rgba(128,128,128,0.06));
  box-sizing: border-box;
}
.bre-effort-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.bre-effort-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--dsh-text, inherit);
}
.bre-link-button {
  background: none;
  border: none;
  padding: 2px 6px;
  font-size: 12px;
  color: var(--dsh-accent, #4a90d9);
  cursor: pointer;
  border-radius: 4px;
}
.bre-link-button:hover { text-decoration: underline; }
.bre-link-button:disabled { opacity: 0.5; cursor: default; text-decoration: none; }
.bre-effort-grid {
  /* Exactly two equal columns mirroring the official capacity pair the editor
     sits under; an odd row count leaves the last cell in the left column,
     so the left side carries the extra level. */
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px 16px;
}
.bre-effort-row {
  display: grid;
  grid-template-columns: 20px 76px minmax(0, 1fr);
  align-items: center;
  gap: 6px;
  font-size: 12px;
}
.bre-effort-row input[type='checkbox'] {
  /* Bigger than the browser default (~13px): a tap/point target that does
     not require precision, in the theme accent when checked. */
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: var(--dsh-accent, #4a90d9);
  cursor: pointer;
}
.bre-effort-level { color: var(--dsh-text-secondary, inherit); }
.bre-effort-wire {
  min-width: 0;
  height: 24px;
  padding: 0 6px;
  border: 1px solid var(--dsh-border, rgba(128,128,128,0.35));
  border-radius: 4px;
  background: var(--dsh-input, #fff);
  color: inherit;
  font-size: 12px;
}
.bre-effort-empty { min-height: 24px; }
.bre-effort-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.bre-primary-button, .bre-secondary-button {
  height: 26px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid var(--dsh-border, rgba(128,128,128,0.35));
}
.bre-primary-button {
  background: var(--dsh-accent, #4a90d9);
  color: #fff;
  border-color: transparent;
}
.bre-primary-button:disabled, .bre-secondary-button:disabled { opacity: 0.5; cursor: default; }
.bre-secondary-button { background: transparent; color: inherit; }
.bre-effort-message { font-size: 12px; margin: 0; }
.bre-effort-message.bre-success { color: #2e7d32; }
.bre-effort-message.bre-error { color: #c62828; }
.bre-effort-message.bre-info { color: var(--dsh-accent, #4a90d9); }
.bre-effort-note { font-size: 11px; margin: 0; color: var(--dsh-text-secondary, inherit); }
/* ---- Input-modality section ---- */
.bre-modality {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.bre-modality-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}
.bre-modality-row input[type='checkbox'] {
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: var(--dsh-accent, #4a90d9);
  cursor: pointer;
}
.bre-modality-clear { margin-left: auto; }
.bre-modality-note { font-size: 11px; margin: 0; color: var(--dsh-text-secondary, inherit); }
/* ---- Zoned suggestion display ---- */
.bre-suggestion {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.bre-reference {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 14px;
  padding: 6px 8px;
  border: 1px dashed var(--dsh-border, rgba(128,128,128,0.35));
  border-radius: 6px;
  font-size: 11px;
  color: var(--dsh-text-secondary, inherit);
}
.bre-reference-title { font-weight: 600; }
.bre-reference-values { display: inline-flex; gap: 14px; }
/* ---- Composer model-menu slider (mounted inside the OFFICIAL menu) ----
   Visuals ported VERBATIM from HanaAyane's dsh-reasoning-effort (MIT) \u2014 the
   only deliberate difference is the chibi-runner "big fish" knob, which is
   dropped so the knob is always the white circle. Class names are re-
   prefixed bre- (the upstream's re- prefix would clash while both plugins
   are installed); every color/size/animation value stays upstream's. */
.bre-slider-body {
  /* upstream .re-model-menu content column (slider area + separator + row).
     The official menu shell carries padding: 4px (ModelSelect.module.css) while
     upstream's own menu has none \u2014 pull the replica flush to the box so the
     row hover spans full width and the bottom row sits at the radius. */
  overflow: hidden;
  margin: -4px;
}
/* The official menu is content-sized; while the replicated popover body is
   live, its box takes the upstream .re-model-menu width. The class is added
   by the mount and removed when the slider is switched off. */
.bre-model-menu-host {
  width: min(312px, calc(100vw - 32px));
  min-width: 0;
}
.bre-slider-advanced {
  /* upstream .re-advanced: the padded area that hosts the slider */
  padding: 14px;
}
.bre-effort {
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: 32px;
  color: var(--dsw-alias-label-secondary);
  user-select: none;
  box-sizing: border-box;
}
.bre-effort-slider {
  --bre-progress: 50%;
  position: relative;
  width: 100%;
  height: 30px;
  flex: 1 1 auto;
  border-radius: 999px;
  isolation: isolate;
  transition: filter 180ms ease;
}
.bre-effort-track {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  background: linear-gradient(100deg, #03040a 0%, #071126 22%, #101d4c 45%, #302262 70%, #5d35a0 100%);
  box-shadow:
    inset 0 1px 0 rgba(189, 199, 255, .15),
    inset 0 -1px 0 rgba(0, 0, 0, .55),
    0 3px 10px rgba(12, 17, 55, .34);
}
.bre-effort-slider::before {
  content: "";
  position: absolute;
  z-index: 4;
  inset: 9px 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: .9;
  background: repeating-linear-gradient(to right, rgba(255,255,255,.9) 0 2px, transparent 2px calc(100% / (var(--bre-level-count) - 1)));
}
.bre-effort-track::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 45%, rgba(82, 130, 255, .12), transparent 24%),
    linear-gradient(90deg, rgba(0, 0, 0, .28), transparent 42%, rgba(168, 113, 255, .12));
  pointer-events: none;
}
.bre-effort-fx {
  position: absolute;
  z-index: 1;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}
.bre-effort-canvas {
  position: absolute;
  z-index: 2;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  image-rendering: pixelated;
  mix-blend-mode: screen;
  transition: filter 140ms ease;
}
.bre-effort-flare {
  position: absolute;
  z-index: 3;
  top: 50%;
  left: var(--bre-progress);
  width: 54px;
  height: 34px;
  border-radius: 50%;
  background: radial-gradient(ellipse at 100% 50%, rgba(255,255,255,.96) 0 4%, rgba(188,189,255,.8) 11%, rgba(106,87,255,.5) 28%, rgba(105,31,255,.2) 49%, transparent 74%);
  filter: blur(1.5px) saturate(1.12);
  mix-blend-mode: screen;
  transform: translate(-100%, -50%);
  transition: left 70ms linear, filter 140ms ease;
  pointer-events: none;
}
.bre-effort-flare::before,
.bre-effort-flare::after {
  content: "";
  position: absolute;
  inset: 50% auto auto 100%;
  border-radius: 999px;
  transform: translate(-50%, -50%);
}
.bre-effort-flare::before {
  width: 52px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(100,160,255,.42), #f1ecff, rgba(193,82,255,.65), transparent);
  box-shadow: 0 0 7px #9b7cff, 0 0 13px rgba(72,132,255,.64);
}
.bre-effort-flare::after {
  width: 1px;
  height: 20px;
  background: linear-gradient(180deg, transparent, rgba(196,190,255,.84), transparent);
  box-shadow: 0 0 7px #9c7cff;
}
.bre-effort-knob {
  position: absolute;
  z-index: 4;
  top: 50%;
  left: clamp(14px, var(--bre-progress), calc(100% - 14px));
  width: 24px;
  height: 24px;
  border: 1px solid rgba(255,255,255,.94);
  border-radius: 50%;
  background: #fff;
  box-shadow:
    0 0 0 2px rgba(92,105,255,.12),
    0 0 14px rgba(121,82,255,.48),
    0 2px 7px rgba(0,0,0,.3);
  transform: translate(-50%, -50%);
  transition: left 190ms cubic-bezier(.22,1,.36,1), transform 160ms ease, box-shadow 180ms ease;
  pointer-events: none;
}
.bre-effort-input {
  position: absolute;
  z-index: 5;
  inset: -5px 0;
  width: 100%;
  height: calc(100% + 10px);
  margin: 0;
  opacity: 0;
  cursor: grab;
  touch-action: none;
}
.bre-effort-input:active { cursor: grabbing; }
.bre-effort-input:focus-visible + .bre-effort-knob {
  outline: 2px solid var(--dsw-static-blue-400);
  outline-offset: 2px;
}
.bre-effort.is-dragging .bre-effort-canvas {
  filter: saturate(1.45) brightness(1.28) contrast(1.06);
}
.bre-effort.is-dragging .bre-effort-flare {
  filter: blur(1.5px) saturate(1.6) brightness(1.42);
  transition: none;
}
.bre-effort.is-dragging .bre-effort-knob {
  transform: translate(-50%, -50%) scale(1.07);
  transition: none;
  box-shadow:
    0 0 0 3px rgba(113,115,255,.25),
    0 0 20px rgba(74,145,255,.86),
    0 0 31px rgba(171,53,255,.66),
    0 3px 8px rgba(0,0,0,.32);
}
.bre-effort-slider[data-top] .bre-effort-track {
  animation: bre-effort-dark-breathe 3s ease-in-out infinite;
}
.bre-effort-slider[data-top] .bre-effort-knob {
  box-shadow:
    0 0 0 3px rgba(119,99,255,.18),
    0 0 16px rgba(135,78,255,.46),
    0 0 24px rgba(53,121,255,.22),
    0 3px 8px rgba(0,0,0,.3);
}
.bre-effort.is-error .bre-effort-slider {
  outline: 1px solid var(--dsw-alias-state-error-secondary);
  outline-offset: 2px;
}
.bre-effort.is-busy { opacity: .72; }
.bre-effort-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
body:not([data-ds-dark-theme]) .bre-effort-slider {
  filter: none;
}
body:not([data-ds-dark-theme]) .bre-effort-track {
  background: var(--dsw-static-blue-75, #e5f0ff);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.9),
    inset 0 0 0 1px rgba(80,133,194,.14),
    0 3px 10px rgba(48,101,165,.13);
}
body:not([data-ds-dark-theme]) .bre-effort-track::before {
  content: "";
  position: absolute;
  z-index: 0;
  inset: 0 auto 0 0;
  width: var(--bre-progress);
  border-radius: inherit;
  background: linear-gradient(90deg, #fff 0%, #e2f0ff 20%, #a8d0fb 57%, #438fdf 100%);
  transition: width 190ms cubic-bezier(.22,1,.36,1);
}
body:not([data-ds-dark-theme]) .bre-effort-slider[data-top] .bre-effort-track::before {
  background: linear-gradient(90deg, #fff 0%, #d7eaff 18%, #75afea 54%, #0751ad 100%);
}
body:not([data-ds-dark-theme]) .bre-effort.is-dragging .bre-effort-track::before {
  transition: none;
}
body:not([data-ds-dark-theme]) .bre-effort-track::after {
  z-index: 1;
  background: linear-gradient(90deg, rgba(255,255,255,.48), transparent 34%, rgba(23,101,201,.07));
}
body:not([data-ds-dark-theme]) .bre-effort-canvas {
  opacity: .78;
  mix-blend-mode: multiply;
}
body:not([data-ds-dark-theme]) .bre-effort-flare {
  background: radial-gradient(ellipse at 100% 50%, rgba(255,255,255,.98) 0 5%, rgba(204,231,255,.88) 13%, rgba(91,162,241,.48) 31%, rgba(37,111,207,.16) 53%, transparent 75%);
  filter: blur(2px) saturate(1.12);
}
body:not([data-ds-dark-theme]) .bre-effort-flare::before {
  background: linear-gradient(90deg, transparent, rgba(116,177,244,.34), #fff, rgba(66,139,225,.58), transparent);
  box-shadow: 0 0 7px rgba(58,133,222,.5), 0 0 13px rgba(104,176,255,.38);
}
body:not([data-ds-dark-theme]) .bre-effort-flare::after {
  background: linear-gradient(180deg, transparent, rgba(255,255,255,.94), transparent);
  box-shadow: 0 0 7px rgba(64,137,224,.44);
}
body:not([data-ds-dark-theme]) .bre-effort-knob {
  border-color: rgba(126,160,197,.32);
  box-shadow:
    0 0 0 2px rgba(58,124,207,.09),
    0 0 13px rgba(48,118,207,.3),
    0 3px 8px rgba(39,77,119,.18);
}
body:not([data-ds-dark-theme]) .bre-effort-slider[data-top] .bre-effort-track {
  animation-name: bre-effort-light-breathe;
}
body:not([data-ds-dark-theme]) .bre-effort-slider[data-top] .bre-effort-knob,
body:not([data-ds-dark-theme]) .bre-effort.is-dragging .bre-effort-knob {
  box-shadow:
    0 0 0 3px rgba(36,105,192,.15),
    0 0 20px rgba(25,100,201,.45),
    0 3px 8px rgba(39,77,119,.18);
}
@keyframes bre-effort-dark-breathe {
  0%, 100% { box-shadow: inset 0 1px 0 rgba(196,204,255,.16), 0 3px 10px rgba(18,25,72,.4); }
  50% { box-shadow: inset 0 1px 0 rgba(220,214,255,.24), 0 0 21px rgba(111,66,255,.5); }
}
@keyframes bre-effort-light-breathe {
  0%, 100% { box-shadow: inset 0 1px 0 rgba(255,255,255,.9), inset 0 0 0 1px rgba(67,124,193,.16), 0 3px 10px rgba(48,101,165,.13); }
  50% { box-shadow: inset 0 1px 0 rgba(255,255,255,.96), inset 0 0 0 1px rgba(31,102,190,.22), 0 0 19px rgba(31,105,201,.24); }
}
.bre-slider-hint {
  /* upstream re-model-status */
  display: block;
  padding: 14px;
  color: var(--dsw-alias-label-tertiary, #9296a0);
  font-size: 12px;
  text-align: center;
}
/* upstream re-model-error: the directory/store error line under the row */
.bre-model-error {
  margin: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  color: var(--dsw-alias-state-error-primary, #c83e4d);
  background: var(--dsw-alias-state-error-tertiary, rgba(220,55,70,.08));
  font-size: 11px;
}
/* upstream .re-menu-separator */
.bre-menu-separator {
  height: 1px;
  background: var(--dsw-alias-stroke-secondary, rgba(121,126,145,.16));
}
/* upstream .re-model-row: name \xB7 current effort \u203A (click \u2192 official model list) */
.bre-model-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 8px;
  min-height: 45px;
  padding: 0 14px;
  width: 100%;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.bre-model-row:hover { background: var(--dsw-alias-fill-tertiary, rgba(120,125,140,.09)); }
.bre-model-row-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
.bre-model-row-effort { color: var(--dsw-static-deepseek-500, #4d70ff); font-size: 12px; }
.bre-advanced-row {
  display: block;
  min-height: 36px;
  padding: 0 14px;
  width: 100%;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  opacity: .82;
}
.bre-advanced-row:hover { background: var(--dsw-alias-fill-tertiary, rgba(120,125,140,.09)); opacity: 1; }
.bre-model-menu-host[data-bre-mode="slider"] > [role="menuitem"]:not(.bre-advanced-row):not([data-plugin]) { display: none; }
.bre-model-menu-host[data-bre-mode="advanced"] > [data-bre-slider],
.bre-model-menu-host[data-bre-mode="native-list"] > [data-bre-slider],
.bre-model-menu-host[data-bre-mode="native-list"] > .bre-advanced-row { display: none; }
.bre-model-menu-host[data-bre-mode="slider"] > [data-bre-slider] { display: block; }
.bre-row-chevron { font-size: 20px; line-height: 1; opacity: .42; }
@media (prefers-reduced-motion: reduce) {
  .bre-effort-slider[data-top] .bre-effort-track { animation: none; }
  .bre-effort-knob,
  .bre-effort-flare,
  body:not([data-ds-dark-theme]) .bre-effort-track::before { transition: none; }
}
/* ---- Models-page slider toggle (boxed setting item) ----
   Item form ported VERBATIM from upstream .re-setting-row; the surrounding
   box is the requested container (border only, transparent background). */
.bre-slider-setting {
  margin-top: 12px;
  padding: 0 14px;
  border: 1px solid var(--dsw-alias-stroke-secondary, rgba(121,126,145,.2));
  border-radius: 12px;
  background: transparent;
}
.bre-slider-setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 16px 0;
  /* Upstream .re-setting-row carries a list bottom border because the general
     settings list held TWO rows (the slider + the big-fish toggle). This box
     holds exactly one, so no divider: the box itself is the container. */
}
.bre-slider-setting-copy { min-width: 0; }
.bre-slider-setting-title {
  color: var(--dsw-alias-label-primary, #15171b);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}
.bre-slider-setting-description {
  margin-top: 3px;
  color: var(--dsw-alias-label-tertiary, #9296a0);
  font-size: 12px;
  line-height: 18px;
}
.bre-slider-setting-control { display: inline-flex; align-items: center; gap: 10px; flex: none; }
.bre-slider-setting-state { color: var(--dsw-alias-label-secondary, #686c75); font-size: 13px; }
.bre-slider-setting-switch {
  position: relative;
  width: 38px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--dsw-alias-fill-quaternary, #c7cbd3);
  cursor: pointer;
  transition: background 150ms ease;
}
.bre-slider-setting-switch:hover { filter: brightness(.97); }
.bre-slider-setting-switch:disabled { cursor: not-allowed; opacity: .45; }
.bre-slider-setting-switch:focus-visible {
  outline: 2px solid var(--dsw-static-blue-400, #5d83ff);
  outline-offset: 2px;
}
.bre-slider-setting-switch.is-on { background: var(--dsw-alias-state-business-primary, #4f73ff); }
.bre-slider-setting-switch-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
  transition: transform 170ms cubic-bezier(.22,1,.36,1);
}
.bre-slider-setting-switch.is-on .bre-slider-setting-switch-knob { transform: translateX(16px); }
`;var yn=U,kn=["slots","locale","connection","remote"],Me=class extends Q.Component{constructor(){super(...arguments);ot(this,"state",{error:null})}static getDerivedStateFromError(t){return{error:t instanceof Error?t.message:String(t)}}componentDidCatch(t,o){console.error("[bre] editor render failed:",t,o.componentStack)}render(){return this.state.error!==null?(0,Q.createElement)("div",{style:{color:"#c00",fontSize:"11px",whiteSpace:"pre-wrap",padding:"6px"}},`${this.props.fallbackText}: ${this.state.error}`):this.props.children}};function vn(){return document.body}function En(){for(let e of Array.from(document.querySelectorAll('[data-composer-card] [role="menu"]')))if(e.previousElementSibling?.matches('button[aria-haspopup="menu"]'))return e}function Tt(e,n){let t=(0,Ze.createRoot)(e);return t.render(n),{wrapper:e,root:t}}function he(e){e!==void 0&&(e.root.unmount(),e.wrapper.remove())}function Mn(e){e.effect(()=>e.locale.register(qe,{zh:wt,en:xt}),"better-basicfun: dictionaries");let n=document.createElement("style");n.dataset.pluginStyles=U,n.textContent=_t,document.head.appendChild(n),e.effect(()=>()=>n.remove(),"better-basicfun: stylesheet");let t=()=>Lt(e),o=e.locale.bind(qe),r=120,d=mt(),s,l,h=!1,k,f,q,advancedOpen=!1,p=()=>{let c=e,y=c.get?.("sessions"),b=c.get?.("modelDirectories"),E=y?.list?.getSnapshot().current;if(!(E===void 0||b===void 0)){if(f!==void 0&&f.sessionId===E)return f.directory;try{let L=b.directoryFor(E);return f={sessionId:E,directory:L},L}catch{f=void 0;return}}},a=()=>{let c=Fe()?En():void 0;if(c===void 0){he(k),k=void 0,q?.remove(),q=void 0,advancedOpen=!1;let E=document.querySelector('[data-composer-card] [role="menu"]');if(E!==null){E.classList.remove("bre-model-menu-host");E.removeAttribute("data-bre-mode");for(let L of Array.from(E.children))L instanceof HTMLButtonElement&&L.getAttribute("role")==="menuitem"&&L.style.display!==""&&(L.style.display="")}return}let y=p();if(y===void 0)return;let S;try{S=y.store?.getSnapshot?.()}catch{return}let C=S?.current,N=C?.provider?.toLowerCase?.()??"",K=C===null||C===void 0?void 0:S?.groups?.find(E=>E.id===C.provider)?.models?.find(E=>E.id===C.model),R=Array.isArray(K?.reasoning?.efforts)&&K.reasoning.efforts.length>=2,isNative=N==="deepseek"||N==="deepseek-official"||N.startsWith("deepseek/");if(isNative||!R){he(k),k=void 0,q?.remove(),q=void 0,advancedOpen=!1,c.classList.remove("bre-model-menu-host"),c.removeAttribute("data-bre-mode");for(let E of Array.from(c.children))E instanceof HTMLButtonElement&&E.getAttribute("role")==="menuitem"&&E.style.display!==""&&(E.style.display="");return}if(k===void 0){let E=document.createElement("div");E.dataset.plugin=U,E.dataset.breSlider="1",c.insertBefore(E,c.firstChild),k=Tt(E,(0,Q.createElement)(Me,{fallbackText:o("renderFailed"),children:(0,Q.createElement)(vt,{directory:y,t:o,pickModel:()=>{Array.from(c.children).find(A=>A instanceof HTMLButtonElement&&A.getAttribute("role")==="menuitem"&&!A.classList.contains("bre-advanced-row"))?.click()}})}))}else(k.wrapper.parentElement!==c||c.firstChild!==k.wrapper)&&c.insertBefore(k.wrapper,c.firstChild);c.classList.add("bre-model-menu-host");if(q===void 0){q=document.createElement("button"),q.type="button",q.setAttribute("role","menuitem"),q.dataset.plugin=U,q.className="bre-advanced-row",q.onclick=()=>{advancedOpen=!advancedOpen,a()},c.appendChild(q)}else q.parentElement!==c&&c.appendChild(q);let V=o(advancedOpen?"advancedSettingsOpen":"advancedSettings");q.textContent!==V&&(q.textContent=V);let b=c.querySelector('[role="menuitemradio"]')!==null;if(b){k.wrapper.contains(document.activeElement)&&(c.tabIndex=-1,c.focus({preventScroll:!0}));c.dataset.breMode="native-list"}else c.dataset.breMode=advancedOpen?"advanced":"slider"},g,x=()=>{if(h){he(g),g=void 0;return}let c=Array.from(document.querySelectorAll('[class*="addBlock"]')).find(y=>y.closest('[class*="section"]')!==null&&y.closest('[class*="dialog"]')===null);if(c===void 0){he(g),g=void 0;return}if(g===void 0){let y=document.createElement("div");y.dataset.plugin=U,y.dataset.breToggle="1",c.appendChild(y),g=Tt(y,(0,Q.createElement)(Me,{fallbackText:o("renderFailed"),children:(0,Q.createElement)(Ye,{t:o})}));return}(g.wrapper.parentElement!==c||c.lastChild!==g.wrapper)&&c.appendChild(g.wrapper)},v=()=>{s===void 0&&(s=window.setTimeout(()=>{s=void 0;let c=vn();bt(c,{wire:t,describeNamespace:()=>me(t()),t:o,mount(y,b){let E=document.createElement("div");E.className="bre-effort-slot",E.dataset.plugin=U,y.appendChild(E);let L=(0,Ze.createRoot)(E),A=W=>{L.render((0,Q.createElement)(Me,{fallbackText:o("renderFailed"),children:(0,Q.createElement)(Ve,W)}))};return A(b),{unmount:()=>{L.unmount()},render:A}}},d),a(),x()},r))},M=()=>{l===void 0&&(l=new MutationObserver(()=>{a(),v()}),l.observe(document.body,{childList:!0,subtree:!0}),v())},T=()=>{s!==void 0&&(window.clearTimeout(s),s=void 0),l?.disconnect(),l=void 0};e.effect(()=>(M(),()=>{T();for(let[,c]of d.mounted)c.editor.unmount();d.mounted.clear(),he(k),k=void 0,he(g),g=void 0}),"better-basicfun: DOM injector"),e.effect(()=>{let c=()=>{d.describePromise=void 0,v()},y=[e.remote.$on("settings/document-updated",b=>{b===xe&&c()}),e.on("connection/reset",c)];return()=>{for(let b of y)b()}},"better-basicfun: pushed invalidations"),e.effect(()=>{let c=b=>{b.key===De&&Rt(b.newValue!=="false")};window.addEventListener("storage",c);let y=Oe(()=>{v()});return()=>{window.removeEventListener("storage",c),y()}},"better-basicfun: slider preference"),e.effect(()=>{let c=!1,y=e;return y.inject?.(["remote.settings"],()=>{c||h||(h=!0,he(g),g=void 0,y.slots?.inject("settings.models.footer",()=>{y.slots?.register({name:"settings.models.footer",id:U+"-slider-toggle",order:15,inject:()=>({t:o})},Ye)}))}),()=>{c=!0}},"better-basicfun: alpha.1 footer slot activation")}

		return module.exports;
	}
});

//# sourceMappingURL=client.js.map

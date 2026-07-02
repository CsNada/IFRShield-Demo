import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Search, BookOpen, ExternalLink, ChevronRight, ArrowLeft,
  CheckCircle2, AlertCircle, Scale, FileText, TrendingUp,
  ChevronDown, ChevronUp, Info,
} from "lucide-react";
import { useLanguage } from "../context/language";

interface Std {
  id: string; shortName: string; name: string; cat: "IFRS" | "IAS";
  color: string; effectiveDate: string; amended: string; url: string;
  objective: string; objPara: string;
  scope: string[]; recognition: string[]; measurement: string[];
  presentation: string[]; disclosures: string[];
  scopePara: string; recPara: string; meaPara: string; presPara: string; discPara: string;
  judgments: Array<{title:string;detail:string;para:string}>;
  auditor: string[]; examples: string[]; related: string[];
  interpretations: string[]; faqs: Array<{q:string;a:string}>;
  defs: Array<{term:string;def:string}>;
}

const DATA: Std[] = [
  {
    id:"IFRS9",shortName:"IFRS 9",name:"Financial Instruments",cat:"IFRS",
    color:"bg-blue-700",effectiveDate:"1 January 2018",
    amended:"Amended 2020 (IBOR Reform Phase 2); further amendments effective 1 January 2023.",
    url:"https://www.ifrs.org/issued-standards/list-of-standards/ifrs-9-financial-instruments/",
    objective:"IFRS 9 establishes principles for financial reporting of financial assets and liabilities to present information relevant for assessing the amounts, timing and uncertainty of future cash flows. It replaced IAS 39.",
    objPara:"IFRS 9, Para. 1.1",
    scope:["Applies to all financial instruments subject to specific exclusions","Excluded: interests in subsidiaries/associates/JVs; lease rights (IFRS 16); employee benefit plan assets (IAS 19); insurance contracts (IFRS 17); share-based payments (IFRS 2)","Certain loan commitments and financial guarantee contracts are in scope"],
    scopePara:"IFRS 9, Para. 2.1-2.7",
    recognition:["Recognise when the entity becomes party to the contractual provisions (Para. 3.1.1)","Regular-way purchases: recognise on trade date or settlement date consistently (Para. 3.1.2)","Derecognise financial asset when contractual rights expire or asset meets derecognition criteria (Para. 3.2.1-3.2.23)"],
    recPara:"IFRS 9, Para. 3.1-3.3",
    measurement:["Amortised Cost: hold-to-collect business model AND SPPI test passed (Para. 4.1.2)","FVOCI (debt): hold-to-collect-and-sell AND SPPI passed (Para. 4.1.2A)","FVTPL: all other assets; mandatory for leveraged cash flow features (Para. 4.1.4)","Equity instruments: irrevocable FVOCI election on initial recognition (Para. 4.1.4)","ECL 3-stage model: Stage 1 (12-month ECL), Stage 2 (lifetime ECL on SICR), Stage 3 (credit-impaired, lifetime ECL) (Para. 5.5.1-5.5.20)"],
    meaPara:"IFRS 9, Para. 4.1-5.5",
    presentation:["FVTPL: gains/losses in profit or loss (Para. 5.7.1)","FVOCI debt: gains/losses in OCI until derecognition, then recycled (Para. 5.7.10)","FVOCI equity: gains/losses in OCI permanently, not recycled (Para. 5.7.5)","Effective interest and impairment losses: separate line items in P&L (Para. 5.4.1, 5.5.8)"],
    presPara:"IFRS 9, Para. 5.7",
    disclosures:["Credit risk management practices and ECL methodology (IFRS 7, Para. 35A-35H)","Loss allowance reconciliation by stage (IFRS 7, Para. 35I-35N)","Credit risk exposures by risk rating grade (IFRS 7, Para. 35M-35N)","Hedge accounting objectives and effectiveness (IFRS 7, Para. 21A-24G)"],
    discPara:"IFRS 7, Para. 35A-42",
    judgments:[
      {title:"Business Model Assessment",detail:"Assessed at portfolio level based on how management manages assets to generate cash flows. Evidence includes performance evaluation, risk management, and compensation practices -- not instrument by instrument.",para:"IFRS 9, Para. 4.1.1; B4.1.1-B4.1.6"},
      {title:"SPPI Test",detail:"Cash flows are SPPI when representing compensation for time value of money and credit risk only. Modified time value, leverage, and prepayment/extension features require careful analysis.",para:"IFRS 9, Para. B4.1.7-B4.1.26"},
      {title:"Significant Increase in Credit Risk (SICR)",detail:"Triggers Stage 1 to Stage 2 transfer. Requires forward-looking information, quantitative triggers, and qualitative backstops. 30-days past due is a rebuttable presumption (Para. 5.5.11).",para:"IFRS 9, Para. 5.5.3; B5.5.1-B5.5.27"},
      {title:"ECL Measurement: PD / LGD / EAD",detail:"Probability-weighted estimates incorporating forward-looking macroeconomic information. Unbiased assumptions calibrated to current conditions. Back-testing expected as part of model validation.",para:"IFRS 9, Para. B5.5.28-B5.5.55"},
    ],
    auditor:["Is the business model documented at portfolio level with evidence of how assets are managed?","Has the SPPI test been performed for each instrument class? Are modified time value features addressed?","What is the basis for SICR thresholds? Is the 30-days past due backstop applied correctly?","Are ECL assumptions (PD, LGD, EAD) supported by historical data, back-tested, and adjusted for forward-looking information?","Has management approved the ECL methodology in documented governance such as Audit Committee minutes?","Are all IFRS 7 disclosures met, including loss allowance reconciliation (Para. 35I-35N)?"],
    examples:["A bank classifies its mortgage portfolio at amortised cost after SPPI test passes and hold-to-collect business model confirmed","Treasury holds government bonds with both collection and sale intentions -- FVOCI classification","A leveraged loan where interest does not solely reflect time value -- mandatorily FVTPL","ECL Stage 2 transfer triggered by a two-notch credit rating downgrade from origination"],
    related:["IFRS 7","IFRS 13","IAS 32","IAS 39 (superseded)"],
    interpretations:["IFRIC 16 -- Hedges of a Net Investment in a Foreign Operation","IFRIC 19 -- Extinguishing Financial Liabilities with Equity Instruments"],
    faqs:[
      {q:"Can IAS 39 still be used instead of IFRS 9?",a:"No. IFRS 9 is mandatory from 1 January 2018. IAS 39 is superseded except for entities electing the IAS 39 fair value hedge accounting model (a limited exemption)."},
      {q:"Must ECL be remeasured at every reporting date?",a:"Yes. An entity must reassess credit risk and recognise or reverse impairment at each reporting date (Para. 5.5.2), reflecting updated macroeconomic forecast changes."},
    ],
    defs:[
      {term:"Expected Credit Loss (ECL)",def:"Probability-weighted estimate of credit losses (present value of cash shortfalls) over the expected life of the financial instrument (Appendix A)."},
      {term:"SPPI",def:"Solely Payments of Principal and Interest -- the contractual cash flow characteristic test for amortised cost or FVOCI classification (Para. 4.1.2-4.1.2A)."},
      {term:"SICR",def:"Significant Increase in Credit Risk -- the condition triggering transfer from Stage 1 to Stage 2 and recognition of lifetime ECL (Para. 5.5.3)."},
    ],
  },
  {
    id:"IFRS15",shortName:"IFRS 15",name:"Revenue from Contracts with Customers",cat:"IFRS",
    color:"bg-indigo-700",effectiveDate:"1 January 2018",
    amended:"Clarifications issued April 2016, effective 1 January 2018. No subsequent major amendments.",
    url:"https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/",
    objective:"IFRS 15 establishes a five-step model for recognising revenue from contracts with customers. Revenue is recognised to depict transfer of goods or services in an amount reflecting the consideration the entity expects to receive in exchange.",
    objPara:"IFRS 15, Para. 1",
    scope:["Applies to contracts with customers; excluded: leases (IFRS 16), insurance (IFRS 17), financial instruments (IFRS 9)","Applies to sale of non-financial assets outside ordinary course of business","Split accounting for contracts containing both lease and revenue components"],
    scopePara:"IFRS 15, Para. 5-8",
    recognition:["Step 1: Identify the contract -- criteria at Para. 9, including collectability probable","Step 2: Identify distinct performance obligations (Para. 22-30)","Step 3: Determine the transaction price including variable consideration (Para. 47-72)","Step 4: Allocate transaction price based on relative standalone selling prices (Para. 73-86)","Step 5: Recognise revenue when/as each performance obligation is satisfied (Para. 31-38)"],
    recPara:"IFRS 15, Para. 9-38",
    measurement:["Transaction price: consideration expected excluding third-party amounts (Para. 47)","Variable consideration: expected value or most likely amount; constrained to avoid significant reversals (Para. 56-58)","Significant financing component: adjust for time value of money if payment timing exceeds one year (Para. 60-65)","Standalone selling price: observable price preferred; otherwise adjusted market assessment, cost-plus, or residual approach (Para. 78-80)"],
    meaPara:"IFRS 15, Para. 47-90",
    presentation:["Contract asset: right to consideration conditional on something other than passage of time (Para. 107-108)","Contract liability: consideration received before performance obligation satisfied (Para. 106)","Trade receivable: unconditional right -- passage of time only (Para. 108)"],
    presPara:"IFRS 15, Para. 105-116",
    disclosures:["Disaggregation of revenue by category (Para. 114-115)","Contract balances: opening/closing assets, liabilities, receivables (Para. 116)","Performance obligations: description, timing, payment terms (Para. 119-120)","Significant judgments in transaction price and timing (Para. 123-126)"],
    discPara:"IFRS 15, Para. 110-129",
    judgments:[
      {title:"Identifying Distinct Performance Obligations",detail:"A good/service is distinct if the customer can benefit on its own or with readily available resources AND it is separately identifiable from other promises. Both criteria must be met.",para:"IFRS 15, Para. 22-30; B14-B32"},
      {title:"Variable Consideration Constraint",detail:"Include variable consideration only when it is highly probable a significant revenue reversal will not occur. Factors outside entity control typically increase the constraint.",para:"IFRS 15, Para. 56-58; B63-B67"},
      {title:"Principal vs Agent",detail:"A principal controls the specified good/service before transfer. Key indicators: primary responsibility, inventory risk, pricing discretion. Gross (principal) vs net (agent) has major revenue impact.",para:"IFRS 15, Para. B34-B38"},
      {title:"Over Time vs Point in Time",detail:"Revenue recognised over time if: customer simultaneously receives and consumes benefits; asset created as customer controls it; or no alternative use and right to payment exists throughout.",para:"IFRS 15, Para. 35-37"},
    ],
    auditor:["Have all performance obligations been correctly identified and are they genuinely distinct?","Is variable consideration appropriately constrained?","Have significant financing components been identified for contracts exceeding one year?","Are contract modifications correctly treated as new contracts or modifications?","Is the principal vs agent assessment documented for all material arrangements?"],
    examples:["Software company: licence + one year of support -- two distinct obligations allocated by standalone selling price","Construction company: revenue over time as customer controls the partially-built asset on their land","Retailer: loyalty points are a separate performance obligation allocated a portion of the transaction price"],
    related:["IFRS 9","IFRS 16","IAS 11 (superseded)","IAS 18 (superseded)"],
    interpretations:["IFRIC 22 -- Foreign Currency Transactions and Advance Consideration"],
    faqs:[
      {q:"What is the five-step model?",a:"Identify contract, identify performance obligations, determine transaction price, allocate transaction price, recognise revenue when/as each performance obligation is satisfied."},
      {q:"How is a contract modification treated?",a:"As a new contract if distinct goods/services added at standalone prices (Para. 20). Otherwise, modify existing contract prospectively or on cumulative catch-up basis."},
    ],
    defs:[
      {term:"Performance Obligation",def:"A promise to transfer a distinct good or service to a customer (Appendix A)."},
      {term:"Transaction Price",def:"The amount of consideration an entity expects in exchange for transferring goods/services, excluding third-party amounts (Appendix A)."},
      {term:"Standalone Selling Price",def:"The price at which an entity would sell a promised good or service separately to a customer (Appendix A)."},
    ],
  },
  {
    id:"IFRS16",shortName:"IFRS 16",name:"Leases",cat:"IFRS",
    color:"bg-violet-700",effectiveDate:"1 January 2019",
    amended:"Amended 2020 (Covid-19 rent concessions); 2021 and 2023 (sale and leaseback amendments).",
    url:"https://www.ifrs.org/issued-standards/list-of-standards/ifrs-16-leases/",
    objective:"IFRS 16 requires lessees to recognise almost all leases on the balance sheet as a right-of-use asset and lease liability, eliminating off-balance sheet lease financing. It replaced IAS 17.",
    objPara:"IFRS 16, Para. 1",
    scope:["Applies to all leases; exemptions for short-term (12 months or less, Para. 5(a)) and low-value assets (Para. 5(b))","Optional exemption for intangible assets (Para. 4)","Lessees: single model for all in-scope leases; Lessors: still distinguish finance vs operating leases"],
    scopePara:"IFRS 16, Para. 2-8",
    recognition:["At commencement: recognise ROU asset and lease liability (Para. 22)","Short-term/low-value exemptions: straight-line expense (Para. 6)","Variable payments not in lease liability: expensed as incurred (Para. 38)","Reassess on modification or change in option assessment (Para. 40-46)"],
    recPara:"IFRS 16, Para. 22-46",
    measurement:["Lease liability: PV of payments not paid, at implicit rate or lessee's IBR (Para. 26)","ROU asset: lease liability + initial direct costs + prepaid payments - lease incentives (Para. 24)","Subsequent: lease liability amortised using effective interest; ROU asset depreciated over shorter of useful life or lease term (Para. 29-38)"],
    meaPara:"IFRS 16, Para. 24-46",
    presentation:["ROU assets: separate line or within owned asset class (Para. 47(a))","Lease liabilities: separate from other liabilities (Para. 47(b))","Depreciation and interest: both in P&L; principal repayments: financing cash outflows (Para. 49-50)"],
    presPara:"IFRS 16, Para. 47-52",
    disclosures:["ROU depreciation by class; additions; interest expense; short-term/low-value expenses (Para. 53)","Maturity analysis of undiscounted lease liabilities (Para. 58)","Qualitative information about leasing activities (Para. 59)"],
    discPara:"IFRS 16, Para. 52-60",
    judgments:[
      {title:"Identifying a Lease",detail:"A contract contains a lease if it conveys the right to control use of an identified asset for a period of time. Control requires: right to obtain substantially all economic benefits AND right to direct how/for what purpose the asset is used.",para:"IFRS 16, Para. B13-B20"},
      {title:"Lease Term",detail:"Non-cancellable period plus extension periods reasonably certain to be exercised. Evidence of economic incentives: significant leasehold improvements, importance of location, cost of relocation.",para:"IFRS 16, Para. 19; B37-B40"},
      {title:"Incremental Borrowing Rate (IBR)",detail:"The rate a lessee would pay to borrow over similar term and with similar security. Derived from observable benchmark rates adjusted for credit spread. Portfolio approach permitted for similar leases.",para:"IFRS 16, Para. 26; Appendix A"},
    ],
    auditor:["Has the entity identified all arrangements containing leases, including service contracts with identified assets?","Is the lease term supported by documented evidence of economic incentives to exercise extension options?","Is the IBR reasonable, consistently applied, and benchmarked against borrowing rates?","Have all modification events triggered remeasurement of the lease liability?"],
    examples:["Retailer leases 50 stores with 5-year base terms and two 3-year extension options -- assesses reasonable certainty for each","Airline applies IBR of 4.2% where the implicit rate cannot be determined","Manufacturing supply contract contains an embedded lease for a dedicated production line -- identified and separated"],
    related:["IAS 17 (superseded)","IFRS 9","IAS 36","IAS 40"],
    interpretations:["IFRIC 4 (superseded)","SIC-27 (superseded)"],
    faqs:[
      {q:"What qualifies as a low-value asset?",a:"IFRS 16 has no defined threshold. The IASB had in mind assets with a new value of approximately USD 5,000 (e.g., tablets, small office furniture). Assessed on an absolute basis regardless of entity size."},
      {q:"How do lessors account for leases?",a:"Lessors classify leases as finance leases (substantially all risks and rewards transferred) or operating leases, similar to IAS 17. The IFRS 16 single-model approach applies only to lessees."},
    ],
    defs:[
      {term:"Right-of-Use Asset",def:"An asset representing the lessee's right to use an underlying asset for the lease term (Appendix A)."},
      {term:"IBR",def:"Incremental Borrowing Rate -- the rate a lessee would pay to borrow over a similar term with similar security to obtain a similar-value asset (Appendix A)."},
    ],
  },
  {
    id:"IFRS13",shortName:"IFRS 13",name:"Fair Value Measurement",cat:"IFRS",
    color:"bg-teal-700",effectiveDate:"1 January 2013",
    amended:"No major post-issuance amendments.",
    url:"https://www.ifrs.org/issued-standards/list-of-standards/ifrs-13-fair-value-measurement/",
    objective:"IFRS 13 defines fair value, establishes a single framework for measuring it, and requires disclosures. It applies whenever another IFRS requires or permits fair value measurements or disclosures.",
    objPara:"IFRS 13, Para. 1",
    scope:["Applies whenever another IFRS requires or permits fair value measurement or disclosure","Does not apply to: share-based payments (IFRS 2); leasing measurements (IFRS 16); net realisable value (IAS 2); value in use (IAS 36)"],
    scopePara:"IFRS 13, Para. 5-7",
    recognition:["Fair value is an exit price -- the price received to sell an asset or paid to transfer a liability in an orderly transaction at the measurement date (Para. 24)","Measured from market participant perspective, not the reporting entity","Non-financial assets: highest and best use concept applies (Para. 27-33)"],
    recPara:"IFRS 13, Para. 24-33",
    measurement:["Principal market: greatest volume and activity -- used by default (Para. 16-17)","Most advantageous market: maximises net amount received (Para. 18-19)","Valuation approaches: market, income, cost -- maximise observable inputs (Para. 61-66)","Hierarchy: Level 1 (quoted prices), Level 2 (observable inputs), Level 3 (unobservable inputs) (Para. 72-90)"],
    meaPara:"IFRS 13, Para. 61-90",
    presentation:["Measurements categorised by hierarchy level","Transfers between levels: disclosed with reason and timing policy","Level 3 reconciliation: opening to closing, gains/losses in P&L and OCI"],
    presPara:"IFRS 13, Para. 91-99",
    disclosures:["For each class: fair value, hierarchy level, valuation technique, inputs (Para. 93(a)-(d))","Recurring Level 3: quantitative inputs, reconciliation, sensitivity analysis (Para. 93(d)-(h))","Non-recurring: reason for measurement (Para. 93(b))"],
    discPara:"IFRS 13, Para. 91-99",
    judgments:[
      {title:"Principal Market",detail:"Market with greatest volume and activity. Entity uses the market it normally transacts in. Transaction costs excluded from fair value but used to determine most advantageous market.",para:"IFRS 13, Para. 16-21"},
      {title:"Level 3 Valuation",detail:"Unobservable inputs must reflect assumptions calibrated to market participant assumptions where possible. Sensitivity analysis disclosing impact of reasonably possible changes is mandatory.",para:"IFRS 13, Para. 87-89; B36-B42"},
      {title:"Highest and Best Use",detail:"For non-financial assets: use that maximises value from market participant perspective. Must be physically possible, legally permissible, financially feasible. May differ from entity's current use.",para:"IFRS 13, Para. 27-33"},
    ],
    auditor:["Is fair value an exit price (not entry/replacement cost)?","Is the principal market correctly identified with evidence of volume and activity?","For Level 3: are unobservable inputs based on best available market participant information?","Has mandatory sensitivity analysis been performed and disclosed for Level 3?","Are transfers between levels identified, timed, and disclosed correctly?"],
    examples:["Investment property at fair value using DCF with entity-specific discount rate -- Level 3","Listed equities at closing prices on principal exchange -- Level 1","Corporate bonds using observable yield curves and credit spreads -- Level 2"],
    related:["IFRS 9","IAS 36","IAS 40","IFRS 5"],
    interpretations:[],
    faqs:[
      {q:"Is fair value the same as market value?",a:"Fair value is a hypothetical exit price for an orderly transaction. For liquid assets they are often equivalent; for illiquid assets they may differ significantly."},
      {q:"Can transaction costs be deducted from fair value?",a:"No. Transaction costs are excluded from fair value measurement but considered when identifying the most advantageous market (Para. 25)."},
    ],
    defs:[
      {term:"Fair Value",def:"The price received to sell an asset or paid to transfer a liability in an orderly transaction between market participants at the measurement date (Appendix A)."},
      {term:"Fair Value Hierarchy",def:"Three-level classification of inputs: Level 1 (quoted prices in active markets), Level 2 (observable), Level 3 (unobservable) (Para. 72-90)."},
    ],
  },
  {
    id:"IAS36",shortName:"IAS 36",name:"Impairment of Assets",cat:"IAS",
    color:"bg-rose-700",effectiveDate:"31 March 2004 (revised); originally 1 July 1999",
    amended:"Amended 2008, 2011, 2013. IASB Exposure Draft for targeted improvements issued 2024.",
    url:"https://www.ifrs.org/issued-standards/list-of-standards/ias-36-impairment-of-assets/",
    objective:"IAS 36 ensures assets are carried at no more than their recoverable amount. An impairment loss is recognised when carrying amount exceeds the amount recoverable through use or sale.",
    objPara:"IAS 36, Para. 1",
    scope:["Applies to: PP&E, intangible assets, goodwill, investments in subsidiaries/associates/JVs in separate FS","Excluded: financial assets (IFRS 9), inventories (IAS 2), contract assets (IFRS 15), deferred tax assets (IAS 12), investment properties at fair value (IAS 40)","Annual test required regardless of indicators for: goodwill, indefinite-life intangibles, intangibles not yet available for use"],
    scopePara:"IAS 36, Para. 2-5",
    recognition:["Test when indicators suggest carrying amount may exceed recoverable amount (Para. 8-17)","Annual goodwill and indefinite-life intangible test at the same time each year (Para. 10)","Identify CGU when asset does not generate largely independent cash inflows (Para. 65-73)","Impairment loss recognised when carrying amount exceeds recoverable amount (Para. 59)"],
    recPara:"IAS 36, Para. 8-64",
    measurement:["Recoverable Amount = MAX(Fair Value Less Costs of Disposal, Value in Use) (Para. 18)","FVLCD: IFRS 13 fair value minus incremental disposal costs (Para. 28-29)","Value in Use: PV of estimated future cash flows using pre-tax discount rate (Para. 30-57)","Impairment loss allocation: goodwill first, then pro-rata to other assets (Para. 104-108)"],
    meaPara:"IAS 36, Para. 18-57; 104-108",
    presentation:["Cost-model assets: impairment loss in P&L (Para. 60)","Revalued assets: impairment as revaluation decrease; excess to P&L (Para. 60)","Reversal of impairment: in P&L up to previously recognised loss -- except goodwill (Para. 117-124)","Goodwill impairment: never reversible (Para. 124)"],
    presPara:"IAS 36, Para. 59-64; 117-125",
    disclosures:["Material impairment: events, amount, asset/CGU description, basis for recoverable amount (Para. 130)","Goodwill/indefinite-life intangibles: carrying amount by CGU, key assumptions, sensitivity analysis (Para. 134-135)","Required sensitivity disclosure when reasonably possible change reduces headroom to zero (Para. 134(f))"],
    discPara:"IAS 36, Para. 126-137",
    judgments:[
      {title:"CGU Identification",detail:"Smallest group of assets generating cash inflows largely independent of other assets. Boundaries must be consistent with internal management monitoring and consistent year-to-year.",para:"IAS 36, Para. 65-73"},
      {title:"Value in Use Cash Flow Projections",detail:"Based on approved budgets/forecasts, maximum 5 years (rebuttable presumption). Terminal value: steady/declining growth rate not exceeding long-term market growth. Exclude uncommitted restructuring and asset enhancement cash flows.",para:"IAS 36, Para. 33-38; B10-B14"},
      {title:"Pre-Tax Discount Rate",detail:"Reflects current market assessments of time value and asset-specific risks. In practice, post-tax WACC adjusted to pre-tax equivalent. Must be independent of the entity's capital structure.",para:"IAS 36, Para. 55-57; A15-A21"},
      {title:"Goodwill Allocation to CGUs",detail:"Allocated to CGUs at the lowest level at which goodwill is monitored for internal management purposes, no larger than an operating segment before aggregation. Should reflect synergies of the acquisition.",para:"IAS 36, Para. 80-99"},
    ],
    auditor:["Are CGU boundaries consistent with internal monitoring? Changed from prior year?","Do cash flow projections reflect approved budgets? Is terminal growth rate reasonable vs long-term GDP?","Is the discount rate pre-tax? Consistently derived from WACC?","Has sensitivity analysis been performed and disclosed? What is the headroom for each material CGU?","Is goodwill allocated to CGUs consistent with the acquisition synergies?"],
    examples:["Media company tests digital streaming CGU annually given ongoing losses -- applying MAX(FVLCD, VIU)","Acquirer allocates goodwill to three CGUs expected to benefit from distribution network synergies","Single production facility where all assets generate cash flows together -- treated as one CGU"],
    related:["IFRS 3","IFRS 13","IAS 16","IAS 38","IAS 40"],
    interpretations:[],
    faqs:[
      {q:"Can goodwill impairment be reversed?",a:"No. Goodwill impairment cannot be reversed (Para. 124), because any recovery would be attributable to internally generated goodwill, which IAS 38 prohibits from recognition."},
      {q:"What is the 5-year projection limit for VIU?",a:"Cash flow projections beyond 5 years require justification of why a longer period is appropriate (Para. 33). This is a rebuttable presumption, not an absolute rule."},
    ],
    defs:[
      {term:"Recoverable Amount",def:"The higher of an asset's (or CGU's) fair value less costs of disposal and its value in use (Para. 6)."},
      {term:"Value in Use (VIU)",def:"The present value of future cash flows expected to be derived from an asset or CGU using a pre-tax discount rate (Para. 6)."},
      {term:"CGU",def:"Cash-Generating Unit -- the smallest identifiable group of assets generating cash inflows largely independent of other assets (Para. 6)."},
    ],
  },
];

function matches(s: Std, q: string): boolean {
  if (!q) return true;
  const lq = q.toLowerCase();
  return s.shortName.toLowerCase().includes(lq) || s.name.toLowerCase().includes(lq) ||
    s.objective.toLowerCase().includes(lq) || s.judgments.some(j => j.title.toLowerCase().includes(lq)) ||
    s.defs.some(d => d.term.toLowerCase().includes(lq)) || s.examples.some(e => e.toLowerCase().includes(lq));
}

function StandardDetail({ s, onBack }: { s: Std; onBack: () => void }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState<string | null>("objective");
  const tog = (id: string) => setOpen(open === id ? null : id);

  const Sec = ({ id, title, para, children }: { id: string; title: string; para?: string; children: React.ReactNode }) => (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-2.5">
      <button onClick={() => tog(id)} className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-slate-900">{title}</span>
          {para && <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded hidden md:inline">{para}</span>}
        </div>
        {open === id ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open === id && <div className="border-t border-slate-200 p-5 bg-white">{children}</div>}
    </div>
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" />{t("Back to Library")}
          </button>
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <span className={`text-xs font-bold text-white px-2.5 py-1.5 rounded-lg ${s.color}`}>{s.shortName}</span>
            <h1 className="text-2xl font-bold text-slate-900">{s.name}</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />Effective: {s.effectiveDate}</span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-slate-400">{s.amended}</span>
          </div>
        </div>
        <a href={s.url} target="_blank" rel="noopener noreferrer">
          <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white gap-1.5 text-xs">
            <ExternalLink className="w-3.5 h-3.5" />{t("View Official Standard")}
          </Button>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <Sec id="objective" title="Objective" para={s.objPara}><p className="text-sm text-slate-700 leading-relaxed">{s.objective}</p></Sec>
          <Sec id="scope" title="Scope" para={s.scopePara}><ul className="space-y-2">{s.scope.map((x, i) => <li key={i} className="flex gap-2 text-sm text-slate-700"><span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 mt-2" />{x}</li>)}</ul></Sec>
          <Sec id="recognition" title="Recognition Principles" para={s.recPara}><ul className="space-y-2">{s.recognition.map((x, i) => <li key={i} className="flex gap-2 text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{x}</li>)}</ul></Sec>
          <Sec id="measurement" title="Measurement Principles" para={s.meaPara}><ul className="space-y-2">{s.measurement.map((x, i) => <li key={i} className="flex gap-2 text-sm text-slate-700"><CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />{x}</li>)}</ul></Sec>
          <Sec id="presentation" title="Presentation Requirements" para={s.presPara}><ul className="space-y-2">{s.presentation.map((x, i) => <li key={i} className="flex gap-2 text-sm text-slate-700"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2" />{x}</li>)}</ul></Sec>
          <Sec id="disclosures" title="Disclosure Requirements" para={s.discPara}><ul className="space-y-2">{s.disclosures.map((x, i) => <li key={i} className="flex gap-2 text-sm text-slate-700"><Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />{x}</li>)}</ul></Sec>
          <Sec id="judgments" title="Key Professional Judgment Areas">
            <div className="space-y-3">{s.judgments.map((j, i) => (
              <div key={i} className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex items-start gap-2 mb-2"><Scale className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" /><span className="text-sm font-semibold text-amber-900 flex-1">{j.title}</span><span className="text-xs font-mono text-amber-600 bg-amber-100 px-2 py-0.5 rounded shrink-0 hidden md:inline">{j.para}</span></div>
                <p className="text-sm text-amber-800 leading-relaxed pl-6">{j.detail}</p>
              </div>
            ))}</div>
          </Sec>
          <Sec id="auditor" title="Common Auditor Review Points">
            <div className="space-y-2">{s.auditor.map((p, i) => <div key={i} className="flex gap-2 p-3 bg-red-50 border border-red-100 rounded-lg"><AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /><p className="text-sm text-red-800">{p}</p></div>)}</div>
          </Sec>
          <Sec id="examples" title="Practical Business Examples">
            <div className="space-y-2">{s.examples.map((e, i) => <div key={i} className="flex gap-2 p-3 bg-slate-50 rounded-lg"><FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /><p className="text-sm text-slate-700">{e}</p></div>)}</div>
          </Sec>
          <Sec id="faq" title="Frequently Asked Questions">
            <div className="space-y-4">{s.faqs.map((f, i) => <div key={i}><p className="text-sm font-semibold text-slate-900 mb-1">Q: {f.q}</p><p className="text-sm text-slate-600 leading-relaxed">A: {f.a}</p></div>)}</div>
          </Sec>
          <Sec id="definitions" title="Important Definitions">
            <div className="space-y-3">{s.defs.map((d, i) => <div key={i} className="p-3 border border-slate-200 rounded-lg"><span className="inline-block text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded mb-1.5">{d.term}</span><p className="text-sm text-slate-600">{d.def}</p></div>)}</div>
          </Sec>
          <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-slate-500 italic">{t("Based on IFRS Foundation guidance.")}</p>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium"><ExternalLink className="w-3 h-3" />View on IFRS Foundation</a>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4 border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">{t("Related Standards")}</h3>
            <div className="space-y-1.5">{s.related.map((r, i) => <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"><BookOpen className="w-3.5 h-3.5 text-slate-400" /><span className="text-sm font-medium text-slate-700">{r}</span><ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-auto" /></div>)}</div>
          </Card>
          {s.interpretations.length > 0 && (
            <Card className="p-4 border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Interpretations (IFRIC / SIC)</h3>
              <div className="space-y-1.5">{s.interpretations.map((r, i) => <div key={i} className="flex items-start gap-2 p-2 text-xs text-slate-600"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 mt-1" />{r}</div>)}</div>
            </Card>
          )}
          <Card className="p-4 border-amber-200 bg-amber-50">
            <div className="flex items-center gap-2 mb-2.5"><TrendingUp className="w-4 h-4 text-amber-600" /><h3 className="text-sm font-semibold text-amber-900">AI Relevance Indicator</h3></div>
            <p className="text-xs text-amber-700 mb-3">Judgment areas most frequently challenged by auditors in recent reviews:</p>
            <div className="space-y-2">{s.judgments.slice(0, 3).map((j, i) => <div key={i} className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" /><span className="text-xs text-amber-800">{j.title}</span></div>)}</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function KnowledgeBasePage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<Std | null>(null);
  const [tab, setTab] = useState<"standards" | "guidance" | "checklists" | "cases">("standards");

  if (active) return <div className="p-8 max-w-7xl mx-auto"><StandardDetail s={active} onBack={() => setActive(null)} /></div>;

  const filtered = DATA.filter(s => matches(s, search));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-7">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
          <div><h1 className="text-3xl font-bold text-slate-900 mb-1">Knowledge Base</h1><p className="text-sm text-slate-500">{t("AI-Powered IFRS Reference Library")}</p></div>
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 text-xs font-semibold rounded-full">AI Assistant Library</span>
        </div>
        <div className="relative max-w-2xl mt-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder={t("Search standards, keywords, industry, topic...")} value={search} onChange={e => setSearch(e.target.value)} className="pl-10 h-12 text-sm border-slate-200 bg-white shadow-sm" />
        </div>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xs text-slate-400">Search by:</span>
          {["Standard Number", "Keyword", "Accounting Topic", "Industry", "Business Scenario"].map(f => (
            <button key={f} onClick={() => setSearch(f === "Standard Number" ? "IFRS" : "")} className="text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors">{f}</button>
          ))}
        </div>
      </div>

      <div className="flex border-b border-slate-200 mb-6">
        {[["standards","IFRS / IAS Standards"],["guidance","Audit Guidance"],["checklists","Checklists"],["cases","Past Cases"]].map(([k,l]) => (
          <button key={k} onClick={() => setTab(k as typeof tab)} className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${tab===k?"border-slate-900 text-slate-900":"border-transparent text-slate-500 hover:text-slate-700"}`}>{l}</button>
        ))}
      </div>

      {tab === "standards" && (
        <>
          {search && <p className="text-sm text-slate-500 mb-4">{filtered.length} result{filtered.length!==1?"s":""} for "{search}"</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(s => (
              <button key={s.id} onClick={() => setActive(s)} className="text-left p-6 border border-slate-200 rounded-2xl bg-white hover:shadow-md hover:border-slate-300 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-xs font-bold text-white px-2.5 py-1.5 rounded-lg ${s.color}`}>{s.shortName}</span>
                  <Badge variant="outline" className="text-slate-500 border-slate-200 text-xs">{s.cat}</Badge>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">{s.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{s.objective}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Effective {s.effectiveDate.split(" ").slice(-1)[0]}</span>
                  <span className="flex items-center gap-1 text-xs text-blue-600 font-medium">View reference <ChevronRight className="w-3.5 h-3.5" /></span>
                </div>
              </button>
            ))}
          </div>
          {filtered.length===0 && <div className="text-center py-16 text-slate-400"><Search className="w-10 h-10 mx-auto mb-3 opacity-30"/><p className="text-sm">No standards match your search.</p></div>}
        </>
      )}

      {tab === "guidance" && (
        <div className="space-y-4">
          {[
            {title:"ECL Methodology Documentation",cat:"IFRS 9",desc:"Step-by-step guidance for audit-ready ECL documentation including PD/LGD/EAD inputs, scenario weighting, back-testing, and governance sign-off.",pages:24},
            {title:"Revenue Recognition -- Five-Step Application Guide",cat:"IFRS 15",desc:"Worked examples for software licences, construction contracts, variable consideration, and principal vs agent assessments.",pages:18},
            {title:"Fair Value Measurement in Practice",cat:"IFRS 13",desc:"Building Level 3 DCF models, calibrating unobservable inputs, and preparing mandatory sensitivity disclosures.",pages:32},
            {title:"Lease Identification and IBR Determination",cat:"IFRS 16",desc:"Decision framework for identifying embedded leases and calculating incremental borrowing rates.",pages:15},
          ].map((g,i) => (
            <Card key={i} className="p-5 border-slate-200 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div><div className="flex items-center gap-2 mb-1.5"><h3 className="text-sm font-semibold text-slate-900">{g.title}</h3><Badge variant="outline" className="text-xs">{g.cat}</Badge></div><p className="text-sm text-slate-600 mb-1.5">{g.desc}</p><span className="text-xs text-slate-400">{g.pages} pages</span></div>
                <Button variant="outline" size="sm" className="border-slate-200 shrink-0 text-xs"><FileText className="w-3.5 h-3.5 mr-1.5"/>Download</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "checklists" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {title:"IFRS 9 Pre-Audit Checklist",items:45,cat:"Financial Instruments",updated:"1 Jun 2026"},
            {title:"IFRS 15 Revenue Recognition Checklist",items:38,cat:"Revenue",updated:"15 May 2026"},
            {title:"IFRS 16 Lease Accounting Checklist",items:32,cat:"Leases",updated:"20 May 2026"},
            {title:"General Audit Readiness Checklist",items:52,cat:"General",updated:"10 Jun 2026"},
          ].map((c,i) => (
            <Card key={i} className="p-5 border-slate-200 hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-3 mb-4"><div className="p-2.5 bg-emerald-50 rounded-xl"><CheckCircle2 className="w-5 h-5 text-emerald-600"/></div><div><h3 className="text-sm font-semibold text-slate-900">{c.title}</h3><Badge variant="secondary" className="text-xs mt-0.5">{c.cat}</Badge></div></div>
              <div className="flex justify-between text-xs text-slate-500 mb-4"><span>{c.items} items</span><span>Updated {c.updated}</span></div>
              <Button variant="outline" size="sm" className="w-full border-slate-200 text-xs">Use Template</Button>
            </Card>
          ))}
        </div>
      )}

      {tab === "cases" && (
        <div className="space-y-4">
          {[
            {title:"ECL Model -- Commercial Lending Portfolio",company:"Global Trade Bank",std:"IFRS 9",outcome:"Approved",lesson:"Comprehensive three-scenario ECL model with documented probability weights and IBR validation substantially improved the audit outcome."},
            {title:"Software Licence + Multi-Year Support",company:"Acme Financial Corp",std:"IFRS 15",outcome:"Approved with modifications",lesson:"Standalone selling price evidence for the support obligation was not included in the original submission, requiring resubmission."},
            {title:"Control Assessment -- Variable Interest Entity",company:"Premier Credit Union",std:"IFRS 10",outcome:"Resubmitted",lesson:"Quantitative analysis of kick-out rights and variable returns needed more detail to support the consolidation conclusion."},
          ].map((c,i) => (
            <Card key={i} className="p-5 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-amber-50 rounded-xl shrink-0"><FileText className="w-5 h-5 text-amber-600"/></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2 gap-3 flex-wrap">
                    <div><h3 className="text-sm font-semibold text-slate-900 mb-1">{c.title}</h3><div className="flex items-center gap-2"><Badge variant="outline" className="text-xs">{c.std}</Badge><span className="text-xs text-slate-500">{c.company}</span></div></div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${c.outcome==="Approved"?"bg-emerald-50 text-emerald-700":c.outcome==="Approved with modifications"?"bg-amber-50 text-amber-700":"bg-red-50 text-red-700"}`}>{c.outcome}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200"><p className="text-sm text-slate-700"><strong>Key Lesson:</strong> {c.lesson}</p></div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

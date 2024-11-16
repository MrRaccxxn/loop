#include <stdio.h>
#include <iostream>
#include <assert.h>
#include "circom.hpp"
#include "calcwit.hpp"
void LoanEligibility_0_create(uint soffset,uint coffset,Circom_CalcWit* ctx,std::string componentName,uint componentFather);
void LoanEligibility_0_run(uint ctx_index,Circom_CalcWit* ctx);
Circom_TemplateFunction _functionTable[1] = { 
LoanEligibility_0_run };
Circom_TemplateFunction _functionTableParallel[1] = { 
NULL };
uint get_main_input_signal_start() {return 2;}

uint get_main_input_signal_no() {return 12;}

uint get_total_signal_no() {return 37;}

uint get_number_of_components() {return 1;}

uint get_size_of_input_hashmap() {return 256;}

uint get_size_of_witness() {return 25;}

uint get_size_of_constants() {return 3;}

uint get_size_of_io_map() {return 0;}

uint get_size_of_bus_field_map() {return 0;}

void release_memory_component(Circom_CalcWit* ctx, uint pos) {{

if (pos != 0){{

if(ctx->componentMemory[pos].subcomponents)
delete []ctx->componentMemory[pos].subcomponents;

if(ctx->componentMemory[pos].subcomponentsParallel)
delete []ctx->componentMemory[pos].subcomponentsParallel;

if(ctx->componentMemory[pos].outputIsSet)
delete []ctx->componentMemory[pos].outputIsSet;

if(ctx->componentMemory[pos].mutexes)
delete []ctx->componentMemory[pos].mutexes;

if(ctx->componentMemory[pos].cvs)
delete []ctx->componentMemory[pos].cvs;

if(ctx->componentMemory[pos].sbct)
delete []ctx->componentMemory[pos].sbct;

}}


}}


// function declarations
// template declarations
void LoanEligibility_0_create(uint soffset,uint coffset,Circom_CalcWit* ctx,std::string componentName,uint componentFather){
ctx->componentMemory[coffset].templateId = 0;
ctx->componentMemory[coffset].templateName = "LoanEligibility";
ctx->componentMemory[coffset].signalStart = soffset;
ctx->componentMemory[coffset].inputCounter = 12;
ctx->componentMemory[coffset].componentName = componentName;
ctx->componentMemory[coffset].idFather = componentFather;
ctx->componentMemory[coffset].subcomponents = new uint[0];
}

void LoanEligibility_0_run(uint ctx_index,Circom_CalcWit* ctx){
FrElement* signalValues = ctx->signalValues;
u64 mySignalStart = ctx->componentMemory[ctx_index].signalStart;
std::string myTemplateName = ctx->componentMemory[ctx_index].templateName;
std::string myComponentName = ctx->componentMemory[ctx_index].componentName;
u64 myFather = ctx->componentMemory[ctx_index].idFather;
u64 myId = ctx_index;
u32* mySubcomponents = ctx->componentMemory[ctx_index].subcomponents;
bool* mySubcomponentsParallel = ctx->componentMemory[ctx_index].subcomponentsParallel;
FrElement* circuitConstants = ctx->circuitConstants;
std::string* listOfTemplateMessages = ctx->listOfTemplateMessages;
FrElement expaux[3];
FrElement lvar[1];
uint sub_component_aux;
uint index_multiple_eq;
int cmp_index_ref_load = -1;
{
PFrElement aux_dest = &signalValues[mySignalStart + 13];
// load src
Fr_sub(&expaux[0],&signalValues[mySignalStart + 2],&signalValues[mySignalStart + 4]); // line circom 22
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 15];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 13],&signalValues[mySignalStart + 13]); // line circom 29
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 16];
// load src
Fr_sub(&expaux[1],&signalValues[mySignalStart + 13],&circuitConstants[0]); // line circom 32
Fr_mul(&expaux[0],&signalValues[mySignalStart + 13],&expaux[1]); // line circom 32
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 17];
// load src
Fr_add(&expaux[0],&signalValues[mySignalStart + 15],&signalValues[mySignalStart + 16]); // line circom 36
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 14];
// load src
// end load src
Fr_copy(aux_dest,&signalValues[mySignalStart + 15]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 18];
// load src
// end load src
Fr_copy(aux_dest,&circuitConstants[1]);
}
{
PFrElement aux_dest = &lvar[0];
// load src
// end load src
Fr_copy(aux_dest,&circuitConstants[1]);
}
Fr_lt(&expaux[0],&lvar[0],&circuitConstants[2]); // line circom 45
while(Fr_isTrue(&expaux[0])){
{
PFrElement aux_dest = &signalValues[mySignalStart + ((1 * (Fr_toInt(&lvar[0]) + 1)) + 18)];
// load src
Fr_add(&expaux[0],&signalValues[mySignalStart + ((1 * Fr_toInt(&lvar[0])) + 18)],&signalValues[mySignalStart + ((1 * Fr_toInt(&lvar[0])) + 5)]); // line circom 47
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &lvar[0];
// load src
Fr_add(&expaux[0],&lvar[0],&circuitConstants[0]); // line circom 45
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
Fr_lt(&expaux[0],&lvar[0],&circuitConstants[2]); // line circom 45
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 29];
// load src
Fr_sub(&expaux[0],&signalValues[mySignalStart + 21],&signalValues[mySignalStart + 11]); // line circom 52
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 30];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 29],&signalValues[mySignalStart + 29]); // line circom 55
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 32];
// load src
Fr_sub(&expaux[0],&signalValues[mySignalStart + 8],&signalValues[mySignalStart + 12]); // line circom 60
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 31];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 32],&signalValues[mySignalStart + 32]); // line circom 61
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 33];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 30],&signalValues[mySignalStart + 31]); // line circom 64
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 34];
// load src
Fr_mul(&expaux[0],&signalValues[mySignalStart + 3],&signalValues[mySignalStart + 14]); // line circom 70
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 35];
// load src
Fr_sub(&expaux[1],&circuitConstants[0],&signalValues[mySignalStart + 3]); // line circom 73
Fr_mul(&expaux[0],&expaux[1],&signalValues[mySignalStart + 33]); // line circom 73
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
{
PFrElement aux_dest = &signalValues[mySignalStart + 0];
// load src
Fr_add(&expaux[0],&signalValues[mySignalStart + 34],&signalValues[mySignalStart + 35]); // line circom 76
// end load src
Fr_copy(aux_dest,&expaux[0]);
}
for (uint i = 0; i < 0; i++){
uint index_subc = ctx->componentMemory[ctx_index].subcomponents[i];
if (index_subc != 0)release_memory_component(ctx,index_subc);
}
}

void run(Circom_CalcWit* ctx){
LoanEligibility_0_create(1,0,ctx,"main",0);
LoanEligibility_0_run(0,ctx);
}


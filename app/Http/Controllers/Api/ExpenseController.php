<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Expense;
use App\User;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $expense = new Expense;
        $expense->category_id = $request->category_id;
        $expense->description = $request->description ?? "none";
        $expense->amount = $request->amount;
        $expense->user_id = $request->user_id;

        if ($expense->save()) {
            return response('Expense added!',200); 
        }
        return response('Failed to add expense!', 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Expense::where('user_id', $id)
            ->join('categories as cat','cat.id','=','expenses.category_id')
            ->orderBy('created_at', 'desc')
            ->select('expenses.*','cat.name as category_name')
            ->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $expense = Expense::find($id);
        $expense->description = $request->description ?? "none";
        $expense->amount = $request->amount;

        if ($expense->save()) {
            return response('Expense updated!',200); 
        }
        return response('Failed to update expense!', 500);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $expense = Expense::find($request->id);
        
        if ($expense->delete()) {
            return response('Expense deleted!', 200); 
        }
        return response('Failed to delete expense!', 500);
    }
}

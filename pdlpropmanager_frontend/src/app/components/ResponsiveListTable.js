// src/components/ResponsiveListTable.jsx
import React, { useState, useRef } from 'react';

import { useLocation } from 'react-router-dom';


const ResponsiveListTable = ({
    columns = [],
    data = [],
    renderRow,
    keyField = 'id'
   
}) => {

    
        


       
        
   
        
        return (
            <>
                {/* Desktop Table */}
                <table className="hidden sm:table min-w-full bg-white border rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    className="text-left p-2 font-semibold text-sm text-gray-700"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody id="paginationList" className="border-t">
                    
                        {data.map((item) => (
                            <tr key={item[keyField]} className="border-t pagination-row">
                                {renderRow(item, "table")}
                            </tr>
                        )
                        )
                        }
            
                    </tbody>
                    
                </table>

                {/* Mobile Cards */}
                <ul className="sm:hidden space-y-4">
                    {data.map((item) => (
                        <li
                            key={item[keyField]}
                            className="bg-white border rounded p-4 shadow-sm space-y-1"
                        >
                            {renderRow(item, "card")}
                        </li>
                    ))}
                </ul>
            </>
        );

    }

export default ResponsiveListTable;

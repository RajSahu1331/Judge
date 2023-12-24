#include <bits/stdc++.h> 
using namespace std;

int main()
{
    long long int p, q, r;
    cin >> p >> q >> r;
    int req = 0;
    for(int i = 63; i >= 0; i--){
        long long int val1 = (p >> i)&1; 
        long long int val2 = (q >> i)&1;
        long long int val3 = (r >> i)&1;

        if(val1 ^ val2 != val3)
            req++;
        

    }
    cout<<res<<endl;
    return 0;
}
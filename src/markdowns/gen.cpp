// Jai Sai Ram
// ALways help me.
#include<bits/stdc++.h>
using namespace std;
#define endl "\n"
typedef long long int ll;

void solve(){
    ll n,i,j,k,l,m,o,n1,n2;
    n1=400;
    n2=1000;
    string s1="";
    string s2="";
    srand(time(0));
    for(i=0;i<n1;i++){
        ll x=rand()%26;
        o=x+97;
        s1+=(char)(o);
    }
    cout<<s1<<endl;
    for(i=0;i<n2;i++){
        ll x=rand()%26;
        o=x+97;
        s2+=(char)(o);
    }
    cout<<s2<<endl;
}
int main(){
    ll t=1;
    while(t--){
        solve();
    }
    return 0;
}
